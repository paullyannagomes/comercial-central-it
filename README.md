# Comercial Central IT

Apresentação institucional em HTML, feita para rodar no iPad em reunião de cliente.
Quinze seções, de capa a contato, mais o bloco de produto do Hyper Agents.

O ponto do projeto é a separação entre design e conteúdo: quem edita texto nunca
precisa abrir o HTML.

- `deck/hibrido.html` — o design e o movimento
- `conteudo/institucional.js` e `conteudo/hyper-agents.js` — só texto e números

Para o contexto completo, as decisões tomadas e as pendências, leia
[CONTEXTO-onde-paramos.md](CONTEXTO-onde-paramos.md) e
[CONTEXTO-decks-centralit.md](CONTEXTO-decks-centralit.md).

## Rodar local

```
python3 -m http.server 4500
```

Abra <http://localhost:4500/deck/hibrido.html>. No iPad, troque `localhost` pelo IP
do Mac (`ipconfig getifaddr en0`) — esse IP muda quando a rede muda.

**Precisa de servidor.** O deck usa módulo ES, e o navegador bloqueia `import` de
arquivo local por CORS. Duplo clique não funciona nesta versão.

## Levar a cliente sem internet

```
python3 empacota.py
```

Sai `output/institucional.html`, com Motion, fontes e imagens embutidos: abre por
duplo clique, funciona offline e cabe em AirDrop. O arquivo é gerado, não versionado.

Ao acrescentar arte nova, confira o número de imagens no relatório do `empacota.py`.
Já aconteceu de a peça sair sem imagem por elas virem do arquivo de conteúdo.

## Editar conteúdo

Mexa só em `conteudo/*.js`. Os campos `espelho:` guardam a frase original do site,
para apontar deriva quando alguém mudar lá e não trouxer para cá.

## Deploy

Vercel, site estático sem build. A raiz `/` reescreve para `deck/hibrido.html`
via [vercel.json](vercel.json). Push na `main` publica.

## Imagens

O repositório carrega só as imagens que o deck usa. A matéria-prima —
`assets-figma/` com 192 capturas do protótipo e `assets-gerados/` — fica de fora
pelo [.gitignore](.gitignore), para o clone não pesar 78MB.

**Ao referenciar uma imagem nova**, acrescente a exceção no `.gitignore`. Sem isso
ela aparece no seu Mac e some no deploy.
