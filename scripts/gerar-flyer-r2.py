"""Flyer institucional r2 arquitetos, A5 de uma face: PDF com sangria, PDF com marcas de corte,
PNG digital 1480 x 2100, prévia 740 x 1050 e SVG editável da mesma composição.

Tudo vem de ../tokens.json: cores, contatos, rótulo do Instagram, descritor, formato, escala
tipográfica, proporções da assinatura, cor da obra e ppi mínimo. O monograma vem de
../logos/r2-mestre.svg. A foto é a da abertura da home do site (fachada do Edifício Lausanne).

A ficha da obra não é escrita aqui: vem de src/content/projetos/06-lausanne.md (titulo, original,
tombamento, intervencao, anos), a fonte única da régua (docs/marca/regua-da-marca.md §6). Rodando no
repositório, o script lê o .md e grava o espelho flyer/ficha-06-lausanne.json; no kit extraído, sem
src/, lê esse espelho.

Requer PyMuPDF (pymupdf) e fontTools. A cópia dentro de flyer/ roda a partir do kit extraído;
no repositório (qualquer das duas cópias) o script também confere recorte e foto com o site.
"""
from pathlib import Path
from html import escape
import base64
import json
import re
import shutil

import pymupdf
from fontTools.pens.boundsPen import BoundsPen
from fontTools.svgLib.path import parse_path
from fontTools.ttLib import TTFont as FonteOrigem

RAIZ = Path(__file__).resolve().parents[1]
KIT = RAIZ if (RAIZ / 'tokens.json').exists() else RAIZ / 'marca/identidade-r2'
REPO = next((r for r in (RAIZ, RAIZ.parents[1]) if (r / 'src/content/projetos').is_dir()), None)  # None no kit extraído
SAIDA = KIT / 'flyer'
SAIDA.mkdir(parents=True, exist_ok=True)

tokens = json.loads((KIT / 'tokens.json').read_text(encoding='utf-8'))
CORES, CONTATO, ASSINATURA = tokens['colors'], tokens['contact'], tokens['lockup']
ESCALA = tokens['typography']['printScalePt']          # 20, 13, 11, 9.5, 8, 7
FOLHA = tokens['formats']['flyer']                     # A5 148 x 210, sangria 3, 1480 x 2100 digital
TINTA, MARCA, PAPEL, BRANCO = CORES['ink'], CORES['brand'], CORES['paper'], CORES['white']
COR_LAUSANNE = tokens['obras']['06-lausanne']['cor']
CORES_DE_TEXTO = {TINTA, BRANCO}                       # o #858585 nunca é texto
PPI_MINIMO = tokens['print']['imagemMinimaPpi']

PT = 72 / 25.4                                         # pontos por milímetro
W, H, B = FOLHA['widthMm'], FOLHA['heightMm'], FOLHA['bleedMm']
M = 12                                                 # margem; a mancha tem 124 mm
X0, X1 = M, W - M
CORPO, PEQUENO = 9.5, 8                                # papéis da escala (tokens: corpo, pequeno)
assert CORPO in ESCALA and PEQUENO in ESCALA

# ---------------------------------------------------------------- conteúdo
# Ficha da obra (§6 da régua): obra · original · tombamento · intervenção · anos, lida do .md do site.
PASTA_OBRA = '06-lausanne'
CAMPOS_FICHA = ('titulo', 'original', 'tombamento', 'intervencao', 'anos')
ESPELHO_FICHA = SAIDA / f'ficha-{PASTA_OBRA}.json'
SEP = '\u00a0· '                                       # separador com espaço inflexível antes do ponto
FATOS_PROIBIDOS = re.compile(r'Severo|José Moreira|1926', re.I)       # régua §6: não confirmados
# Recorte literal de `foco` (src/data/escritorio.ts): só supressão de trecho, nenhuma palavra trocada.
FOCO = ('O foco principal do escritório é a dedicação ao estudo de edifícios de valor histórico/cultural '
        'da cidade de São Paulo e ao desenvolvimento de readequação espacial de apartamentos '
        'pertencentes aos mesmos, procurando recuperar e requalificar os elementos arquitetônicos originais.')
URL_PROJETOS = CONTATO['website'] + 'projetos/'
ROTULO_QR = CONTATO['websiteLabel'] + '/projetos'
FOTO_ARQUIVO = '006_cff1282f.jpg'                      # capa da home: fotos-wix/capas-projetos/
FOTO_ALT = 'Fachada do Edifício Lausanne, de Franz Heep: venezianas vinho, verdes e cinza'


def palavras_do_foco_original():
    texto = (REPO / 'src/data/escritorio.ts').read_text(encoding='utf-8')
    return re.search(r"export const foco =\s*'(.*?)';", texto, re.S).group(1).split()


def frontmatter(md):
    """Campos 'chave: valor' do bloco entre os dois '---' do .md (aspas externas removidas)."""
    bloco = re.match(r'---\r?\n(.*?)\r?\n---', md.read_text(encoding='utf-8'), re.S).group(1)
    campos = {}
    for linha in bloco.splitlines():
        m = re.match(r'^([A-Za-z]+):\s*(.*?)\s*$', linha)
        if m:
            v = m.group(2)
            campos[m.group(1)] = v[1:-1] if len(v) >= 2 and v[0] == v[-1] and v[0] in '"\'' else v
    return campos


def ler_ficha():
    """Itens da ficha. No repositório: do .md do site, gravando o espelho para o kit. No kit: do espelho."""
    if REPO:
        fonte = f'src/content/projetos/{PASTA_OBRA}.md'
        fm = frontmatter(REPO / fonte)
        assert fm['titulo'] == tokens['obras'][PASTA_OBRA]['nome'], 'nome da obra diferente do token'
        assert fm['cor'].upper() == COR_LAUSANNE.upper(), 'cor da obra diferente do token'
        itens = [fm[c] for c in CAMPOS_FICHA if fm.get(c, '').strip()]
        ESPELHO_FICHA.write_text(json.dumps({
            'aviso': f'Gerado por gerar-flyer-r2.py a partir de {fonte}. Não editar: para mudar a ficha, '
                     'mude o .md e rode o gerador no repositório.',
            'fonte': fonte, 'campos': list(CAMPOS_FICHA), 'itens': itens,
        }, ensure_ascii=False, indent=2) + '\n', encoding='utf-8', newline='\n')
    else:
        assert ESPELHO_FICHA.exists(), f'{ESPELHO_FICHA.name} ausente: rode scripts/gerar-flyer-r2.py no repositório'
        itens = json.loads(ESPELHO_FICHA.read_text(encoding='utf-8'))['itens']
    for item in itens:
        assert not FATOS_PROIBIDOS.search(item), f'fato não confirmado na ficha: {item}'
        assert SEP.strip() not in item, f'item com separador dentro: {item}'
    return itens


FICHA = ler_ficha()


def conferir_com_o_repositorio():
    """No repositório: confirma que o recorte e a foto são os do site."""
    if not REPO:
        return
    original = palavras_do_foco_original()
    usadas = FOCO.split()
    limpa = lambda p: p.rstrip(',.;')
    assert limpa(usadas[0]) == limpa(original[0]), 'o recorte começa no início da frase'
    i = 0
    for p in usadas:                                   # cada palavra aparece, em ordem, no foco
        while i < len(original) and limpa(original[i]) != limpa(p):
            i += 1
        assert i < len(original), f'palavra que não está no foco, na ordem: {p}'
        i += 1
    home = (REPO / 'src/pages/index.astro').read_text(encoding='utf-8')
    assert re.search(r"foto\('capas-projetos', '([^']+)'\)", home).group(1) == FOTO_ARQUIVO, 'a abertura da home mudou de foto'


conferir_com_o_repositorio()

# ---------------------------------------------------------------- foto (original, sem recorte, sem filtro)
FOTO = SAIDA / 'foto-lausanne-fachada.jpg'
if REPO:
    shutil.copyfile(REPO / 'fotos-wix/capas-projetos' / FOTO_ARQUIVO, FOTO)   # sempre da origem
assert FOTO.exists(), 'foto-lausanne-fachada.jpg ausente: copie de fotos-wix/capas-projetos/006_cff1282f.jpg'
_foto = pymupdf.Pixmap(str(FOTO))
FOTO_PX_L, FOTO_PX_A = _foto.width, _foto.height
del _foto

# ---------------------------------------------------------------- fonte (Work Sans 400)
FONTE_VARIAVEL = KIT / 'fonts/WorkSans-Variable.ttf'
FONTE = KIT / 'cartoes/WorkSans-Regular.ttf'
if not FONTE.exists() or FONTE.stat().st_mtime < FONTE_VARIAVEL.stat().st_mtime:
    from fontTools.varLib.instancer import instantiateVariableFont
    instantiateVariableFont(FonteOrigem(FONTE_VARIAVEL), {'wght': 400}, inplace=True).save(FONTE)
FONTE_MEDIDA = pymupdf.Font(fontfile=str(FONTE))
_f = FonteOrigem(FONTE)
CAIXA_ALTA = _f['OS/2'].sCapHeight / _f['head'].unitsPerEm
_GLIFOS, _CMAP, _UPEM = _f.getGlyphSet(), _f.getBestCmap(), _f['head'].unitsPerEm


def topo_do_texto(texto, tamanho):
    """Altura real do texto acima da linha de base (mm): o maior topo de glifo, com ascendentes."""
    topo = 0
    for letra in texto:
        pen = BoundsPen(_GLIFOS)
        _GLIFOS[_CMAP[ord(letra)]].draw(pen)
        if pen.bounds:
            topo = max(topo, pen.bounds[3])
    return topo / _UPEM * tamanho / PT


del _f


def largura_mm(texto, tamanho):
    return FONTE_MEDIDA.text_length(texto, fontsize=tamanho) / PT


def rgb(hexa):
    return tuple(int(hexa[i:i + 2], 16) / 255 for i in (1, 3, 5))


def quebrar_palavras(texto, largura, tamanho):
    """Quebra de linha com menor irregularidade (a última linha é livre)."""
    palavras = texto.split()
    n = len(palavras)
    espaco = largura_mm(' ', tamanho)
    larg = lambda i, j: sum(largura_mm(p, tamanho) for p in palavras[i:j]) + espaco * (j - i - 1)
    melhor = {n: (0, [])}
    for i in range(n - 1, -1, -1):
        opcoes = []
        for j in range(i + 1, n + 1):
            l = larg(i, j)
            if l > largura:
                break
            custo = 0 if j == n else (largura - l) ** 2
            opcoes.append((custo + melhor[j][0], [' '.join(palavras[i:j])] + melhor[j][1]))
        melhor[i] = min(opcoes, key=lambda o: o[0])
    return melhor[0][1]


def quebrar_ficha(itens, largura, tamanho):
    """Régua §6: a ficha só quebra depois de um separador, que fica no fim da linha; um item nunca se
    parte. Entre as quebras possíveis, a de menos linhas e, entre essas, a de linhas mais equilibradas."""
    fim = SEP.rstrip()                                 # '\u00a0·' no fim de toda linha que não é a última
    n = len(itens)
    for i, item in enumerate(itens):
        com_sep = item + (fim if i < n - 1 else '')
        assert largura_mm(com_sep, tamanho) <= largura, f'item da ficha maior que a linha: {item}'
    candidatas = []
    for corte in range(0, 1 << (n - 1)):
        grupos, atual = [], [itens[0]]
        for k in range(1, n):
            if corte >> (k - 1) & 1:
                grupos.append(atual)
                atual = []
            atual.append(itens[k])
        grupos.append(atual)
        linhas = [SEP.join(g) + (fim if j < len(grupos) - 1 else '') for j, g in enumerate(grupos)]
        if all(largura_mm(l, tamanho) <= largura for l in linhas):
            candidatas.append((len(linhas), max(largura_mm(l, tamanho) for l in linhas), linhas))
    linhas = min(candidatas)[2]
    assert ' '.join(linhas) == SEP.join(itens), 'a quebra alterou a ficha'
    assert all(l.endswith(fim) for l in linhas[:-1]) and not any(l.startswith('·') for l in linhas)
    return linhas


# ---------------------------------------------------------------- monograma e símbolo
MESTRE = (KIT / 'logos/r2-mestre.svg').read_text(encoding='utf-8')
CAMINHOS = re.findall(r'<path d="([^"]+)"', MESTRE)
_pen = BoundsPen(None)
for _d in CAMINHOS:
    parse_path(_d, _pen)
XMIN, YMIN, XMAX, YMAX = _pen.bounds                   # borda visível do desenho (não o viewBox)
_K = ASSINATURA['glifoNoQuadrado'] * 100 / (XMAX - XMIN)
_TX, _TY = 50 - (XMIN + XMAX) / 2 * _K, 50 - (YMIN + YMAX) / 2 * _K
_GRUPO = (f'<rect width="100" height="100" fill="{MARCA}"/><g transform="translate({_TX:.4f} {_TY:.4f}) '
          f'scale({_K:.6f})" fill="{BRANCO}">' + ''.join(f'<path d="{d}"/>' for d in CAMINHOS) + '</g>')


def simbolo_svg(lado_mm):
    """Símbolo: quadrado da marca com o monograma branco; o glifo ocupa 0,64 da largura do quadrado,
    centrado pela borda visível do desenho nos dois eixos."""
    lado = lado_mm * PT
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{lado:.4f}" height="{lado:.4f}" '
            f'viewBox="0 0 100 100">{_GRUPO}</svg>')


# ---------------------------------------------------------------- composição (mm a partir do canto superior esquerdo do corte)
ops = []


def fundo():
    ops.append(('rect', -B, -B, W + 2 * B, H + 2 * B, PAPEL))


def fio(x, y, largura, espessura_pt, cor):
    ops.append(('rect', x, y, largura, espessura_pt / PT, cor))


def texto(x, base, valor, tamanho, cor=TINTA, url=None, direita=False):
    assert tamanho in ESCALA, f'tamanho fora da escala: {tamanho}'
    assert cor in CORES_DE_TEXTO, f'cor de texto fora dos tokens: {cor}'
    larg = largura_mm(valor, tamanho)
    esquerda = x - larg if direita else x
    assert X0 - 0.01 <= esquerda and esquerda + larg <= X1 + 0.01, f'texto fora da mancha: {valor}'
    ops.append(('texto', esquerda, base, valor, tamanho, cor, url, larg))


def caixa_alta(tamanho):
    return CAIXA_ALTA * tamanho / PT


def assinatura(x, y, lado):
    """Assinatura da §2: símbolo e, a 0,25 do lado, 'r2 arquitetos' (corpo) e o descritor (pequeno),
    o bloco de texto centrado na altura do quadrado."""
    assert lado >= ASSINATURA['minimoAssinaturaPapelMm'], 'assinatura abaixo do mínimo (régua §2)'
    ops.append(('simbolo', x, y, lado))
    entre = 1.45 * PEQUENO / PT
    alto = caixa_alta(CORPO) + entre
    base1 = y + (lado - alto) / 2 + caixa_alta(CORPO)
    xt = x + lado + ASSINATURA['intervaloTexto'] * lado
    texto(xt, base1, tokens['name'], CORPO)
    texto(xt, base1 + entre, ASSINATURA['descritor'], PEQUENO)


def qr(x, y, modulo, url):
    ops.append(('qr', x, y, modulo, url))


def matriz_qr(url):
    """Matriz de módulos do QR (correção de erro M), gerada pelo MuPDF e lida do bitmap."""
    mu = pymupdf.mupdf
    bitmap = pymupdf.Pixmap(mu.fz_new_barcode_pixmap(mu.FZ_BARCODE_QRCODE, url, 400, 2, 0, 0))
    amostras, w, n = bitmap.samples, bitmap.width, bitmap.n
    escuro = lambda cx, cy: amostras[(cy * w + cx) * n] < 128
    pontos = [(cx, cy) for cy in range(bitmap.height) for cx in range(w) if escuro(cx, cy)]
    xmin, xmax = min(p[0] for p in pontos), max(p[0] for p in pontos)
    ymin = min(p[1] for p in pontos)
    corrida = 0
    while escuro(xmin + corrida, ymin):
        corrida += 1
    lado = corrida / 7                                 # o localizador mede 7 módulos
    quantos = round((xmax - xmin + 1) / lado)
    assert (quantos - 17) % 4 == 0
    return [[escuro(int(xmin + (c + .5) * lado), int(ymin + (r + .5) * lado)) for c in range(quantos)] for r in range(quantos)]


# --- posições
LADO_ASSINATURA = 12                                   # o mesmo quadrado do cabeçalho dos documentos A4
Y_ASSINATURA = M
Y_FIO_CABECALHO = Y_ASSINATURA + LADO_ASSINATURA + ASSINATURA['respiro'] * LADO_ASSINATURA   # respiro: metade do lado
FOTO_X, FOTO_L = X0, X1 - X0                           # a foto ocupa a mancha, inteira, sem recorte
FOTO_A = FOTO_L * FOTO_PX_A / FOTO_PX_L
FOTO_Y = Y_FIO_CABECALHO + 0.5 / PT + 5
PPI_FOTO = FOTO_PX_L / (FOTO_L / 25.4)
assert PPI_FOTO >= PPI_MINIMO, f'foto com {PPI_FOTO:.0f} ppi, abaixo de {PPI_MINIMO}'

fundo()
assinatura(X0, Y_ASSINATURA, LADO_ASSINATURA)
fio(X0, Y_FIO_CABECALHO, X1 - X0, 0.5, MARCA)                       # 0,5 pt sob o cabeçalho
ops.append(('foto', FOTO_X, FOTO_Y, FOTO_L, FOTO_A))

Y_FIO_OBRA = FOTO_Y + FOTO_A + 3.5
fio(X0, Y_FIO_OBRA, X1 - X0, 1, COR_LAUSANNE)                       # 1 pt na cor da obra, sobre a ficha
entre_pequeno = 1.45 * PEQUENO / PT
base = Y_FIO_OBRA + 1 / PT + 3.5 + caixa_alta(PEQUENO)
LINHAS_FICHA = quebrar_ficha(FICHA, X1 - X0, PEQUENO)
for i, linha in enumerate(LINHAS_FICHA):
    texto(X0, base + i * entre_pequeno, linha, PEQUENO)
base_ficha = base + (len(LINHAS_FICHA) - 1) * entre_pequeno

entre_corpo = 1.45 * CORPO / PT
base = base_ficha + 6.5 + caixa_alta(CORPO)
linhas_foco = quebrar_palavras(FOCO, X1 - X0, CORPO)
for i, linha in enumerate(linhas_foco):
    texto(X0, base + i * entre_corpo, linha, CORPO)
base_foco = base + (len(linhas_foco) - 1) * entre_corpo

# bloco de contatos e QR, ancorado à margem inferior
MODULO_QR = 0.7
MATRIZ = matriz_qr(URL_PROJETOS)
LADO_QR = len(MATRIZ) * MODULO_QR
QUIETA = 4 * MODULO_QR                                              # zona de silêncio do QR
Y_ROTULO = H - M                                                    # linha de base do rótulo, na margem
TOPO_ROTULO = topo_do_texto(ROTULO_QR, PEQUENO)                     # topo dos ascendentes do rótulo
FIO_CONTATOS_PT = 1
Y_QR = Y_ROTULO - TOPO_ROTULO - QUIETA - LADO_QR                    # 4 módulos livres entre o QR e o rótulo
Y_FIO_CONTATOS = Y_QR - QUIETA - FIO_CONTATOS_PT / PT               # a borda de baixo do fio fica a 4 módulos do QR
fio(X0, Y_FIO_CONTATOS, X1 - X0, FIO_CONTATOS_PT, MARCA)            # 1 pt no topo da seção
assert Y_QR - (Y_FIO_CONTATOS + FIO_CONTATOS_PT / PT) >= QUIETA - 1e-6, 'o fio invade a zona de silêncio do QR'
assert Y_ROTULO - TOPO_ROTULO - (Y_QR + LADO_QR) >= QUIETA - 1e-6, 'o rótulo invade a zona de silêncio do QR'
qr(X1 - LADO_QR, Y_QR, MODULO_QR, URL_PROJETOS)
texto(X1, Y_ROTULO, ROTULO_QR, PEQUENO, direita=True, url=URL_PROJETOS)

base = Y_QR + caixa_alta(CORPO)
texto(X0, base, CONTATO['email'], CORPO, url='mailto:' + CONTATO['email'])
texto(X0, base + entre_corpo, CONTATO['websiteLabel'], CORPO, url=CONTATO['website'])
texto(X0, base + 2 * entre_corpo, CONTATO['instagramLabel'], CORPO, url=CONTATO['instagramUrl'])
texto(X0, Y_ROTULO - entre_pequeno, CONTATO['addressLines'][0], PEQUENO)      # a última linha do endereço
texto(X0, Y_ROTULO, CONTATO['addressLines'][1], PEQUENO)                      # divide a base do rótulo do QR
assert base_foco + 3 < Y_FIO_CONTATOS, f'o texto encosta no bloco de contatos ({Y_FIO_CONTATOS - base_foco:.1f} mm)'
print(f'Folga entre o texto e o fio dos contatos: {Y_FIO_CONTATOS - base_foco:.1f} mm; fio do cabeçalho em y={Y_FIO_CABECALHO:.1f} mm.')


# ---------------------------------------------------------------- PDF
def desenhar_pdf(destino, folga_mm=0, marcas=False):
    """folga_mm: faixa além da sangria (para as marcas de corte). A caixa de corte e a de sangria
    ficam definidas em qualquer variante."""
    o = B + folga_mm
    doc = pymupdf.open()
    p = doc.new_page(width=(W + 2 * o) * PT, height=(H + 2 * o) * PT)
    p.insert_font(fontname='WorkSans', fontfile=str(FONTE))
    ret = lambda x, y, w, h: pymupdf.Rect((o + x) * PT, (o + y) * PT, (o + x + w) * PT, (o + y + h) * PT)
    for op in ops:
        if op[0] == 'rect':
            _, x, y, w, h, cor = op
            p.draw_rect(ret(x, y, w, h), color=None, fill=rgb(cor))
        elif op[0] == 'texto':
            _, x, base, valor, tamanho, cor, url, larg = op
            p.insert_text(((o + x) * PT, (o + base) * PT), valor, fontsize=tamanho, fontname='WorkSans', color=rgb(cor))
            if url:
                p.insert_link({'kind': pymupdf.LINK_URI, 'uri': url, 'from': ret(x, base - tamanho / PT, larg, tamanho * 1.25 / PT)})
        elif op[0] == 'simbolo':
            _, x, y, lado = op
            origem = pymupdf.open('pdf', pymupdf.open(stream=simbolo_svg(lado).encode(), filetype='svg').convert_to_pdf())
            p.show_pdf_page(ret(x, y, lado, lado), origem, 0)
        elif op[0] == 'foto':
            _, x, y, w, h = op
            p.insert_image(ret(x, y, w, h), filename=str(FOTO), keep_proportion=False)
        elif op[0] == 'qr':
            _, x, y, modulo, url = op
            forma = p.new_shape()
            for r, linha in enumerate(MATRIZ):
                c = 0
                while c < len(linha):
                    if linha[c]:
                        fim = c
                        while fim < len(linha) and linha[fim]:
                            fim += 1
                        forma.draw_rect(ret(x + c * modulo, y + r * modulo, (fim - c) * modulo, modulo))
                        c = fim
                    else:
                        c += 1
            forma.finish(fill=rgb(TINTA), color=None)
            forma.commit()
            lado = len(MATRIZ) * modulo
            p.insert_link({'kind': pymupdf.LINK_URI, 'uri': url, 'from': ret(x, y, lado, lado)})
    if marcas:
        for cx in (0, W):
            for cy in (0, H):
                sx, sy = (-1 if cx == 0 else 1), (-1 if cy == 0 else 1)
                perto, longe = B + 0.5, B + folga_mm - 0.5
                p.draw_line(((o + cx + sx * perto) * PT, (o + cy) * PT), ((o + cx + sx * longe) * PT, (o + cy) * PT),
                            color=(0, 0, 0), width=0.25)
                p.draw_line(((o + cx) * PT, (o + cy + sy * perto) * PT), ((o + cx) * PT, (o + cy + sy * longe) * PT),
                            color=(0, 0, 0), width=0.25)
    p.set_trimbox(ret(0, 0, W, H))
    p.set_bleedbox(ret(-B, -B, W + 2 * B, H + 2 * B) & p.rect)
    doc.set_metadata({
        'title': 'r2 arquitetos, flyer A5',
        'author': 'r2 arquitetos',
        'subject': 'Flyer de uma face. A5, 148 x 210 mm, sangria de 3 mm. Work Sans 400. Cores em RGB; prova de cor na gráfica.',
        'creator': 'gerar-flyer-r2.py',
    })
    doc.save(destino, garbage=4, deflate=True)
    doc.close()


PDF = SAIDA / 'r2-flyer-a5.pdf'
PDF_MARCAS = SAIDA / 'r2-flyer-a5-marcas-de-corte.pdf'
desenhar_pdf(PDF)
desenhar_pdf(PDF_MARCAS, folga_mm=6, marcas=True)

# ---------------------------------------------------------------- PNG (sem sangria)
pdf = pymupdf.open(PDF)
corte = pymupdf.Rect(B * PT, B * PT, (B + W) * PT, (B + H) * PT)
for nome, largura, altura in [('r2-flyer-digital', FOLHA['digitalWidth'], FOLHA['digitalHeight']),
                              ('r2-flyer-preview', FOLHA['digitalWidth'] // 2, FOLHA['digitalHeight'] // 2)]:
    pix = pdf[0].get_pixmap(matrix=pymupdf.Matrix(largura / (W * PT), altura / (H * PT)), clip=corte, alpha=False)
    assert (pix.width, pix.height) == (largura, altura), f'{nome}: {pix.width} x {pix.height}'
    pix.set_dpi(round(largura / (W / 25.4)), round(altura / (H / 25.4)))
    pix.save(SAIDA / f'{nome}.png')

# ---------------------------------------------------------------- SVG editável
def svg_texto(op):
    _, x, base, valor, tamanho, cor, url, larg = op
    elemento = (f'<text x="{x:.3f}" y="{base:.3f}" font-size="{tamanho / PT:.4f}" fill="{cor}">{escape(valor)}</text>')
    return f'<a href="{escape(url, quote=True)}" xlink:href="{escape(url, quote=True)}">{elemento}</a>' if url else elemento


partes = []
for op in ops:
    if op[0] == 'rect':
        _, x, y, w, h, cor = op
        partes.append(f'<rect x="{x:.3f}" y="{y:.3f}" width="{w:.3f}" height="{h:.3f}" fill="{cor}"/>')
    elif op[0] == 'texto':
        partes.append(svg_texto(op))
    elif op[0] == 'simbolo':
        _, x, y, lado = op
        partes.append(f'<svg x="{x:g}" y="{y:g}" width="{lado:g}" height="{lado:g}" viewBox="0 0 100 100">{_GRUPO}</svg>')
    elif op[0] == 'foto':
        _, x, y, w, h = op
        codigo = base64.b64encode(FOTO.read_bytes()).decode('ascii')
        partes.append(f'<image x="{x:g}" y="{y:.3f}" width="{w:g}" height="{h:.3f}" preserveAspectRatio="none" '
                      f'role="img" aria-label="{escape(FOTO_ALT, quote=True)}" href="data:image/jpeg;base64,{codigo}" xlink:href="data:image/jpeg;base64,{codigo}"/>')
    elif op[0] == 'qr':
        _, x, y, modulo, url = op
        caminho = []
        for r, linha in enumerate(MATRIZ):
            c = 0
            while c < len(linha):
                if linha[c]:
                    fim = c
                    while fim < len(linha) and linha[fim]:
                        fim += 1
                    caminho.append(f'M{x + c * modulo:.3f} {y + r * modulo:.3f}h{(fim - c) * modulo:.3f}v{modulo:.3f}h-{(fim - c) * modulo:.3f}z')
                    c = fim
                else:
                    c += 1
        lado = len(MATRIZ) * modulo
        partes.append(f'<a href="{escape(url, quote=True)}" xlink:href="{escape(url, quote=True)}"><path d="{"".join(caminho)}" fill="{TINTA}"/>'
                      f'<rect x="{x:.3f}" y="{y:.3f}" width="{lado:.3f}" height="{lado:.3f}" fill="none"/></a>')

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{W}mm" height="{H}mm" viewBox="0 0 {W} {H}" role="img" aria-labelledby="flyer-titulo flyer-desc">
<title id="flyer-titulo">r2 arquitetos, flyer A5</title>
<desc id="flyer-desc">{escape(FOTO_ALT)}. Ficha do Edifício Lausanne, recorte do texto do escritório, contatos e QR code para os projetos. Texto editável em Work Sans 400.</desc>
<style>@font-face{{font-family:'Work Sans';src:url('../fonts/WorkSans-Variable.ttf') format('truetype');font-weight:400}}text{{font-family:'Work Sans','Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:400}}</style>
{chr(10).join(partes)}
</svg>
'''
(SAIDA / 'r2-flyer-editavel.svg').write_text(svg, encoding='utf-8')

print(PDF)
print(PDF_MARCAS)
print(f'Foto: {FOTO_PX_L} x {FOTO_PX_A} px em {FOTO_L:g} x {FOTO_A:.1f} mm = {PPI_FOTO:.0f} ppi, sem recorte.')
print('Ficha (' + ESPELHO_FICHA.name + (', lida do .md' if REPO else ', espelho do kit') + '):')
for linha in LINHAS_FICHA:
    print('  ' + linha.replace('\u00a0', '~'))
print(f'QR: {len(MATRIZ)} módulos de {MODULO_QR} mm = {LADO_QR:.1f} mm; margem de silêncio {QUIETA:.1f} mm.')
