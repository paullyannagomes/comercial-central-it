#!/usr/bin/env python3
"""
Gera uma imagem por frente de atuacao, na paleta medida do prototipo.

Cada prompt descreve o *conceito* da frente em forma abstrata, e proibe
explicitamente o repertorio batido do setor: mao de robo, executivo apontando
para holograma, cidade com chip escrito IA. E esse repertorio que faz a peca
parecer generica.

Uso: python3 gera-frentes.py
"""
import base64, json, pathlib, time, urllib.error, urllib.request

RAIZ = pathlib.Path(__file__).parent
SAIDA = RAIZ / "assets-gerados"
CHAVE = [l.split("=", 1)[1].strip().strip('"\'')
         for l in pathlib.Path("/Users/paullyannagomes/projects/social-agent/.env.local").read_text().splitlines()
         if l.strip().startswith("OPENAI_API_KEY")][0]

BASE = (
    "Imagem abstrata para slide corporativo escuro, formato retrato. "
    "Paleta estrita: preto azulado quase absoluto (#000214) dominante, teal luminoso (#0ba1aa) "
    "e roxo profundo (#4d1c75) como unicos acentos. Composicao com o terco inferior mais escuro "
    "e vazio, porque entra texto por cima. Cinematografico, alto contraste, profundidade, grao sutil. "
    "PROIBIDO: qualquer texto, letra, numero ou logotipo; rosto humano; mao humana ou robotica; "
    "robo humanoide; pessoa de terno apontando para holograma; cidade noturna; chip com sigla; "
    "icone flutuante em circulo. Nada de clichê de banco de imagem sobre inteligencia artificial. "
)

FRENTES = {
    "f-transformacao-digital": (
        "Conceito: ciclos curtos de transformacao. Aneis concentricos de luz que se sucedem e "
        "aceleram da esquerda para a direita, cada um mais nitido que o anterior, sugerindo "
        "iteracao que ganha definicao. Particulas finas acompanhando o movimento."),
    "f-estrategia": (
        "Conceito: direcao e alinhamento. Muitas linhas finas dispersas na base que sobem e "
        "convergem para um unico eixo luminoso no alto, como decisoes que se organizam num rumo. "
        "Geometria limpa, sem ruido."),
    "f-eficiencia-operacoes": (
        "Conceito: fluxo que deixa de ser caotico. Do lado esquerdo, linhas emaranhadas e sobrepostas; "
        "ao longo da imagem elas se desembaracam e viram trilhos paralelos regulares do lado direito. "
        "A transicao e o assunto da imagem."),
    "f-operacoes-ti": (
        "Conceito: resiliencia e antecipacao. Uma malha tridimensional de nos conectados, com um pulso "
        "de luz teal atravessando a estrutura, e um no adiante ja aceso antes de o pulso chegar nele, "
        "sugerindo previsao. Estrutura estavel, profundidade."),
    "f-omnichannel": (
        "Conceito: muitos canais, uma conversa. Varias fitas de luz de espessuras diferentes entrando "
        "por bordas distintas do quadro e se trancando numa unica fita continua que segue adiante, "
        "sem emenda visivel."),
    "f-solucoes-inovadoras": (
        "Conceito: ecossistema modular. Blocos geometricos facetados translucidos se encaixando no ar "
        "para formar uma estrutura maior, com arestas iluminadas e vazios entre eles. Sensacao de "
        "arquitetura que ainda esta se montando."),
}


def gera(nome: str, extra: str) -> None:
    destino = SAIDA / f"{nome}.png"
    if destino.exists():
        print(f"  {nome}: ja existe, pulando")
        return
    corpo = json.dumps({"model": "gpt-image-2", "prompt": BASE + extra,
                        "size": "1024x1536", "quality": "high", "n": 1}).encode()
    req = urllib.request.Request("https://api.openai.com/v1/images/generations", data=corpo,
                                 headers={"Authorization": f"Bearer {CHAVE}", "Content-Type": "application/json"})
    t = time.time()
    try:
        d = json.load(urllib.request.urlopen(req, timeout=300))
        SAIDA.mkdir(exist_ok=True)
        destino.write_bytes(base64.b64decode(d["data"][0]["b64_json"]))
        print(f"  {nome}: {time.time() - t:.0f}s, {destino.stat().st_size // 1024} KB")
    except urllib.error.HTTPError as e:
        print(f"  {nome}: FALHOU {e.code} {e.read()[:160].decode(errors='ignore')}")


if __name__ == "__main__":
    print(f"gerando {len(FRENTES)} imagens:")
    for nome, extra in FRENTES.items():
        gera(nome, extra)
    print("pronto")
