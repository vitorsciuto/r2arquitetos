"""Cartão institucional r2 arquitetos: PDF vetorial, 90 x 50 mm, sangria de 3 mm.

Gera frente e verso em um PDF (r2-cartao-frente-verso.pdf) e as prévias
cartao-1.png (frente) e cartao-2.png (verso), cortadas no formato final.

Tudo vem de ../tokens.json: cores, contatos, rótulo do Instagram, descritor,
formato, escala tipográfica e proporções da assinatura. O desenho do monograma
vem de ../logos/r2-mestre.svg (os mesmos paths do site).

Requer PyMuPDF (pymupdf) e fontTools. A cópia dentro de cartoes/ roda a partir
do kit extraído; a de scripts/ roda a partir da raiz do repositório.
"""
from pathlib import Path
import json
import re

import pymupdf
from fontTools.pens.boundsPen import BoundsPen
from fontTools.svgLib.path import parse_path
from fontTools.ttLib import TTFont as FonteOrigem

RAIZ = Path(__file__).resolve().parents[1]
KIT = RAIZ if (RAIZ / 'tokens.json').exists() else RAIZ / 'marca/identidade-r2'
SAIDA = KIT / 'cartoes'
SAIDA.mkdir(parents=True, exist_ok=True)

tokens = json.loads((KIT / 'tokens.json').read_text(encoding='utf-8'))
CORES, CONTATO, ASSINATURA = tokens['colors'], tokens['contact'], tokens['lockup']
ESCALA = tokens['typography']['printScalePt']          # 20, 13, 11, 9.5, 8, 7
CARTAO = tokens['formats']['businessCard']             # 90 x 50, sangria 3
TINTA, MARCA, PAPEL, BRANCO = CORES['ink'], CORES['brand'], CORES['paper'], CORES['white']
CORES_DE_TEXTO = {TINTA, BRANCO}                       # o #858585 nunca é texto

PT = 72 / 25.4                                         # pontos por milímetro
W, H, B = CARTAO['widthMm'], CARTAO['heightMm'], CARTAO['bleedMm']
PEQUENO, CORPO, ROTULO = 8, 9.5, 7                     # papéis da escala (tokens: pequeno, corpo, rótulo)
assert PEQUENO in ESCALA and CORPO in ESCALA and ROTULO in ESCALA

# ---------------------------------------------------------------- fonte (Work Sans 400)
FONTE_VARIAVEL = KIT / 'fonts/WorkSans-Variable.ttf'
FONTE = KIT / 'cartoes/WorkSans-Regular.ttf'
if not FONTE.exists() or FONTE.stat().st_mtime < FONTE_VARIAVEL.stat().st_mtime:
    from fontTools.varLib.instancer import instantiateVariableFont
    instantiateVariableFont(FonteOrigem(FONTE_VARIAVEL), {'wght': 400}, inplace=True).save(FONTE)
FONTE_MEDIDA = pymupdf.Font(fontfile=str(FONTE))
ALTURA_CAIXA_ALTA = FonteOrigem(FONTE)['OS/2'].sCapHeight / FonteOrigem(FONTE)['head'].unitsPerEm


def largura_pt(texto, tamanho):
    return FONTE_MEDIDA.text_length(texto, fontsize=tamanho)


def rgb(hexa):
    return tuple(int(hexa[i:i + 2], 16) / 255 for i in (1, 3, 5))


# ---------------------------------------------------------------- monograma e símbolo
MESTRE = (KIT / 'logos/r2-mestre.svg').read_text(encoding='utf-8')
CAMINHOS = re.findall(r'<path d="([^"]+)"', MESTRE)
_pen = BoundsPen(None)
for _d in CAMINHOS:
    parse_path(_d, _pen)
XMIN, YMIN, XMAX, YMAX = _pen.bounds                   # borda visível do desenho (não o viewBox)


def simbolo_svg(lado_mm, com_quadrado=True):
    """Símbolo: quadrado da marca com o monograma branco. O glifo ocupa 0,64 da largura do
    quadrado e é centrado pela borda visível do desenho, nos dois eixos."""
    k = ASSINATURA['glifoNoQuadrado'] * 100 / (XMAX - XMIN)
    tx, ty = 50 - (XMIN + XMAX) / 2 * k, 50 - (YMIN + YMAX) / 2 * k
    quadrado = f'<rect width="100" height="100" fill="{MARCA}"/>' if com_quadrado else ''
    paths = ''.join(f'<path d="{d}"/>' for d in CAMINHOS)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{lado_mm * PT:.4f}" height="{lado_mm * PT:.4f}" '
            f'viewBox="0 0 100 100">{quadrado}<g transform="translate({tx:.4f} {ty:.4f}) scale({k:.6f})" '
            f'fill="{BRANCO}">{paths}</g></svg>')


# ---------------------------------------------------------------- desenho (mm a partir do canto superior esquerdo do corte)
doc = pymupdf.open()


class Folha:
    def __init__(self, fundo):
        self.fundo = fundo
        self.p = doc.new_page(width=(W + 2 * B) * PT, height=(H + 2 * B) * PT)
        self.p.insert_font(fontname='WorkSans', fontfile=str(FONTE))
        self.p.draw_rect(self.p.rect, color=None, fill=rgb(fundo))
        self.p.set_trimbox(pymupdf.Rect(B * PT, B * PT, (B + W) * PT, (B + H) * PT))
        self.p.set_bleedbox(self.p.rect)

    def rect(self, x, y, w, h):
        return pymupdf.Rect((B + x) * PT, (B + y) * PT, (B + x + w) * PT, (B + y + h) * PT)

    def fio(self, x, y, largura, espessura_pt, cor):
        self.p.draw_rect(self.rect(x, y, largura, espessura_pt / PT), color=None, fill=rgb(cor))

    def texto(self, x, base, valor, tamanho, cor=TINTA, url=None, centro=False):
        assert tamanho in ESCALA, f'tamanho fora da escala: {tamanho}'
        assert cor in CORES_DE_TEXTO, f'cor de texto fora dos tokens: {cor}'
        assert cor == TINTA or self.fundo == MARCA, 'texto branco só sobre o fundo #858585 (régua §3)'
        larg = largura_pt(valor, tamanho) / PT
        esquerda = x - larg / 2 if centro else x
        assert 5 <= esquerda and esquerda + larg <= W - 5, f'texto fora da mancha: {valor}'
        self.p.insert_text(((B + esquerda) * PT, (B + base) * PT), valor, fontsize=tamanho,
                           fontname='WorkSans', color=rgb(cor))
        if url:
            self.p.insert_link({'kind': pymupdf.LINK_URI, 'uri': url, 'from': self.rect(
                esquerda, base - tamanho / PT, larg, tamanho * 1.25 / PT)})

    def simbolo(self, x, y, lado, com_quadrado=True):
        origem = pymupdf.open('pdf', pymupdf.open(stream=simbolo_svg(lado, com_quadrado).encode(), filetype='svg').convert_to_pdf())
        self.p.show_pdf_page(self.rect(x, y, lado, lado), origem, 0)


def assinatura(folha, x, y, lado, t1=PEQUENO, t2=ROTULO):
    """Assinatura da §2 no tamanho mínimo (quadrado de 10 mm): símbolo e, à direita (0,25 do lado),
    'r2 arquitetos' a 8 pt e o descritor a 7 pt, o bloco de texto centrado na altura do quadrado
    (da altura das maiúsculas da 1ª linha até a linha de base da 2ª). É a montagem do flyer e dos
    documentos (quadrado de 12 mm, 9,5 e 8 pt) reduzida a 10/12: a distância entre as linhas de base
    é a mesma fração do lado que lá (1,45 x 8 pt em 12 mm, 0,34 do lado)."""
    assert lado >= ASSINATURA['minimoAssinaturaPapelMm'], 'assinatura abaixo do mínimo (régua §2)'
    assert t2 >= ROTULO, 'descritor abaixo de 7 pt (régua §2)'
    folha.simbolo(x, y, lado)
    entre = lado * (1.45 * 8 / PT) / 12                # distância entre as linhas de base
    cap1 = ALTURA_CAIXA_ALTA * t1 / PT
    base1 = y + (lado - (cap1 + entre)) / 2 + cap1
    xt = x + lado + ASSINATURA['intervaloTexto'] * lado
    folha.texto(xt, base1, tokens['name'], t1)
    folha.texto(xt, base1 + entre, ASSINATURA['descritor'], t2)


# ---------------------------------------------------------------- frente
# Fundo #858585 sangrado. O símbolo é o quadrado todo: a referência dos 64% é a altura do corte
# (50 mm), então o glifo mede 0,64 x 50 = 32 mm de largura. O descritor fica abaixo, em branco, em 9,5 pt.
# Branco é a exceção registrada na régua (docs/marca/regua-da-marca.md §3 e tokens.json →
# lockup.textoSobreMarca): sobre o fundo #858585 o texto é branco. A tinta daria 1,7:1 e não se leria.
frente = Folha(MARCA)
glifo_l = ASSINATURA['glifoNoQuadrado'] * H
glifo_a = glifo_l * (YMAX - YMIN) / (XMAX - XMIN)
vao = 7.5
cap = ALTURA_CAIXA_ALTA * CORPO / PT
topo = (H - (glifo_a + vao + cap)) / 2
frente.simbolo((W - H) / 2, topo + glifo_a / 2 - H / 2, H, com_quadrado=False)
frente.texto(W / 2, topo + glifo_a + vao + cap, ASSINATURA['descritor'], CORPO, BRANCO, centro=True)

# ---------------------------------------------------------------- verso
verso = Folha(PAPEL)
M = 6                                                  # margem; maior que metade do quadrado (respiro)
LADO = ASSINATURA['minimoAssinaturaPapelMm']           # quadrado da assinatura: o mínimo, 10 mm
assert LADO >= ASSINATURA['minimoAssinaturaPapelMm'] and M >= ASSINATURA['respiro'] * LADO
assinatura(verso, M, M, LADO)
Y_FIO = M + LADO + 5                                   # respiro mínimo: metade do lado do quadrado
assert Y_FIO - (M + LADO) >= ASSINATURA['respiro'] * LADO
verso.fio(M, Y_FIO, W - 2 * M, 0.5, MARCA)             # 0,5 pt sob o cabeçalho, na largura da mancha
entre = 1.45 * PEQUENO / PT
base = Y_FIO + 0.5 / PT + 3.2 + ALTURA_CAIXA_ALTA * PEQUENO / PT
verso.texto(M, base, CONTATO['email'], PEQUENO, url='mailto:' + CONTATO['email'])
verso.texto(M, base + entre, CONTATO['websiteLabel'], PEQUENO, url=CONTATO['website'])
verso.texto(M, base + 2 * entre, CONTATO['instagramLabel'], PEQUENO, url=CONTATO['instagramUrl'])
for i, linha in enumerate(CONTATO['addressLines']):
    verso.texto(M, base + (3.4 + i) * entre, linha, PEQUENO)
assert base + 4.4 * entre <= H - M + 1, 'endereço passa da margem inferior'

# ---------------------------------------------------------------- saída
doc.set_metadata({
    'title': 'r2 arquitetos, cartão institucional, 90 x 50 mm',
    'author': 'r2 arquitetos',
    'subject': 'Frente e verso. Sangria de 3 mm. Work Sans 400. Cores em RGB; prova de cor na gráfica.',
    'creator': 'gerar-cartoes-r2.py',
})
pdf = SAIDA / 'r2-cartao-frente-verso.pdf'
doc.save(pdf, garbage=4, deflate=True)
doc.close()

final = pymupdf.open(pdf)
corte = pymupdf.Rect(B * PT, B * PT, (B + W) * PT, (B + H) * PT)
for i, pagina in enumerate(final, 1):
    pix = pagina.get_pixmap(dpi=300, clip=corte, alpha=False)     # prévia sem sangria
    pix.set_dpi(300, 300)
    pix.save(SAIDA / f'cartao-{i}.png')
print(pdf)
