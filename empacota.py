#!/usr/bin/env python3
"""
Empacota o deck num arquivo unico, que abre por duplo clique e funciona sem
internet. E o formato que o comercial leva no iPad.

O que entra embutido:
  - o Motion e o conteudo, num so bloco de script (modulo inline nao sofre
    o bloqueio de CORS que impede `import` de arquivo em file://)
  - as fontes da marca em base64, senao sem wi-fi cai para fonte de sistema
  - as imagens redimensionadas e em base64

Uso:  python3 empacota.py
Saida: output/institucional.html
"""
import base64, io, json, pathlib, re, subprocess, sys, urllib.request

RAIZ = pathlib.Path(__file__).parent
DECK = RAIZ / "deck" / "hibrido.html"
SAIDA = RAIZ / "output" / "institucional.html"
NAV = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/131.0 Safari/537.36"}

# Largura maxima util: o palco nunca passa disso, entao guardar mais e peso morto.
LARGURA_MAX = 1700
QUALIDADE = 82
# o mesmo --fundo do deck: e sobre ele que a peca achata quem tem alpha inutil
FUNDO = (0, 2, 20, 255)


def junta_script(html: str) -> str:
    """O <script type=module> vira um bundle unico, sem import externo."""
    m = re.search(r'<script type="module">(.*?)</script>', html, re.S)
    if not m:
        sys.exit("nao achei o script de modulo no deck")
    corpo = m.group(1)
    # o temporario mora junto do deck, senao os imports relativos nao resolvem
    tmp = DECK.parent / ".tmp-entrada.js"
    tmp.write_text(corpo)
    r = subprocess.run(
        ["npx", "--yes", "esbuild", str(tmp), "--bundle", "--format=iife", "--minify"],
        capture_output=True, text=True, cwd=DECK.parent)
    tmp.unlink(missing_ok=True)
    if r.returncode:
        sys.exit("esbuild falhou:\n" + r.stderr[-1500:])
    return html.replace(m.group(0), "<script>\n" + r.stdout + "\n</script>")


def embute_fontes(html: str) -> str:
    """Baixa os woff2 do Google e troca o <link> por @font-face em base64."""
    link = re.search(r'<link href="(https://fonts\.googleapis\.com/css2[^"]+)"[^>]*>', html)
    if not link:
        print("  (sem link de fonte, pulando)")
        return html
    css = urllib.request.urlopen(urllib.request.Request(link.group(1), headers=NAV), timeout=60).read().decode()
    # so o bloco latin: o resto e peso que ninguem le nesta peca
    blocos, total = [], 0
    for bloco in re.findall(r'/\*\s*latin\s*\*/\s*@font-face\s*\{[^}]+\}', css):
        u = re.search(r'url\((https://[^)]+\.woff2)\)', bloco)
        if not u:
            continue
        dados = urllib.request.urlopen(urllib.request.Request(u.group(1), headers=NAV), timeout=60).read()
        total += len(dados)
        b64 = base64.b64encode(dados).decode()
        # troca so a URL. O format('woff2') ja vem no CSS do Google, e
        # reescreve-lo aqui gerava "format('woff2') format('woff2')": src
        # invalido, face descartada em silencio, peca inteira em fonte de
        # sistema. O empacotador ainda dizia "7 faces" e o arquivo tinha as
        # sete, entao so olhando a tipografia renderizada isso aparece.
        blocos.append(bloco.replace(u.group(0), f"url(data:font/woff2;base64,{b64})"))
    print(f"  fontes: {len(blocos)} faces, {total // 1024} KB")
    return html.replace(link.group(0), "<style>\n" + "\n".join(blocos) + "\n</style>")


def embute_imagens(html: str) -> str:
    """Redimensiona e embute. PNG de 3 MB vira JPEG de algumas centenas de KB."""
    from PIL import Image
    total_antes = total_depois = 0
    # Dois padroes: url('...') no CSS e o caminho solto dentro do JS empacotado,
    # onde moram as imagens que vem do arquivo de conteudo. Sem o segundo, a
    # peca empacotada perde as seis das frentes.
    achados = set(re.findall(r"url\('([^']+\.(?:png|jpg|jpeg))'\)", html))
    achados |= set(re.findall(r'["\'`](\.\./[a-z-]+/[^"\'`]+\.(?:png|jpg|jpeg))["\'`]', html))
    for caminho in sorted(achados):
        arq = (DECK.parent / caminho).resolve()
        if not arq.exists():
            print(f"  AUSENTE: {caminho}")
            continue
        total_antes += arq.stat().st_size
        im = Image.open(arq)
        # A logo tem fundo transparente, e JPEG nao guarda alpha: convertida,
        # ela sairia com um retangulo chapado por tras. Entao ela vai em PNG.
        #
        # Ter canal alpha nao basta como criterio. As artes de fundo tambem tem
        # o canal, com 1% a 3% de pixels quase opacos que ninguem enxerga, e
        # manda-las para PNG por causa disso triplicou a peca: 1,8 MB viraram
        # 5,6 MB, e ela precisa caber num AirDrop. Quem tem recorte de verdade
        # passa de longe do limite; quem tem so ruido e achatado no fundo da
        # peca, que e escuro e portanto nao deixa halo.
        alpha = False
        if im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info):
            im = im.convert("RGBA")
            canal = im.getchannel("A")
            translucidos = sum(canal.histogram()[:250])
            alpha = translucidos > .1 * im.width * im.height
            if not alpha:
                chapa = Image.new("RGBA", im.size, FUNDO)
                chapa.alpha_composite(im)
                im = chapa
        im = im.convert("RGBA" if alpha else "RGB")
        if im.width > LARGURA_MAX:
            im = im.resize((LARGURA_MAX, round(im.height * LARGURA_MAX / im.width)), Image.LANCZOS)
        buf = io.BytesIO()
        if alpha:
            im.save(buf, "PNG", optimize=True)
            mime = "image/png"
        else:
            im.save(buf, "JPEG", quality=QUALIDADE, optimize=True, progressive=True)
            mime = "image/jpeg"
        total_depois += buf.tell()
        b64 = base64.b64encode(buf.getvalue()).decode()
        html = html.replace(caminho, f"data:{mime};base64,{b64}")
        print(f"  {caminho.split('/')[-1]:22} {arq.stat().st_size // 1024:5} KB -> {buf.tell() // 1024:5} KB")
    print(f"  imagens: {total_antes // 1024} KB -> {total_depois // 1024} KB")
    return html


def main():
    html = DECK.read_text()
    print("empacotando:")
    html = junta_script(html)
    html = embute_fontes(html)
    html = embute_imagens(html)
    # a peca passa a ser uma coisa so: nada de rede em tempo de uso
    html = html.replace("<title>Central IT · híbrido</title>",
                        "<title>Central IT · apresentação institucional</title>")
    SAIDA.parent.mkdir(exist_ok=True)
    SAIDA.write_text(html)
    kb = SAIDA.stat().st_size // 1024
    print(f"\n{SAIDA.relative_to(RAIZ)}  {kb} KB")
    if re.search(r'(src|href)="(?!data:)(https?:)?//', html):
        print("AVISO: sobrou referencia externa, a peca nao esta 100% offline")
    else:
        print("sem nenhuma referencia externa: abre por duplo clique e roda offline")


if __name__ == "__main__":
    main()
