"""Baixa todas as imagens originais do site Wix da r2 arquitetos.
Fonte: galerias-wix.json (extraído do JSON interno do Wix em 2026-08-24).
Saída: fotos-wix/<pasta>/<ordem>_<id>.<ext> + manifest.json
"""
import json, os, sys, time, urllib.request, concurrent.futures as cf

SRC = r"C:/Users/Vitor/AppData/Local/Temp/claude/C--Users-Vitor-Documents-Rita-r2-arquitetos/bb4b39da-bf7b-4a40-8431-11b3a31de157/scratchpad/galerias-wix.json"
OUT = os.path.dirname(os.path.abspath(__file__))
PASTAS = {
    "/": "home", "/projetos": "capas-projetos", "/escritorio": "escritorio", "/publicacoes": "publicacoes",
    "/1st-project": "01-casa-de-praia", "/2nd-project": "02-louveira-1", "/3rd-project": "03-louveira-2",
    "/4th-project": "04-guanabara", "/5th-project": "05-praca-roosevelt", "/6th-project": "06-lausanne",
}
LOGO = "aa00f7_1dc4cb03f746406ca6923c74d4742852~mv2.jpg"

data = json.load(open(SRC, encoding="utf-8"))
jobs, manifest = [], {}
for path, pasta in PASTAS.items():
    imgs = data.get(path, {}).get("images", [])
    manifest[pasta] = []
    for im in imgs:
        ext = os.path.splitext(im["id"])[1] or ".jpg"
        short = im["id"].split("_", 1)[1][:8] if "_" in im["id"] else im["id"][:8]
        fname = f"{im['order']:03d}_{short}{ext}"
        dest = os.path.join(OUT, pasta, fname)
        jobs.append((im["url"], dest))
        manifest[pasta].append({**im, "arquivo": f"{pasta}/{fname}"})
jobs.append((f"https://static.wixstatic.com/media/{LOGO}", os.path.join(OUT, "logo", "logo-r2-wix.jpg")))

def fetch(job):
    url, dest = job
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    if os.path.exists(dest) and os.path.getsize(dest) > 0:
        return ("skip", dest, os.path.getsize(dest))
    for tent in range(4):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=60) as r, open(dest, "wb") as f:
                f.write(r.read())
            return ("ok", dest, os.path.getsize(dest))
        except Exception as e:
            err = e; time.sleep(1.5 * (tent + 1))
    return ("erro", dest, str(err))

t0 = time.time(); res = {"ok": 0, "skip": 0, "erro": 0}; total = 0; erros = []
with cf.ThreadPoolExecutor(8) as ex:
    for st, dest, info in ex.map(fetch, jobs):
        res[st] += 1
        if st == "erro": erros.append((dest, info))
        else: total += info
json.dump(manifest, open(os.path.join(OUT, "manifest.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(f"{len(jobs)} arquivos: ok={res['ok']} skip={res['skip']} erro={res['erro']} | {total/1e6:.1f} MB | {time.time()-t0:.0f}s")
for d, e in erros: print("ERRO", d, e)
