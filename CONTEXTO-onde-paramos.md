# Onde paramos

Handoff da sessão. Leia isto antes de retomar, junto com `CONTEXTO-decks-centralit.md`,
que traz o problema original e as regras de marca.

---

## 1. O que existe hoje

Uma apresentação institucional em HTML, que roda no iPad, com 15 seções:

| bloco | seções |
|---|---|
| Institucional | capa, "Onde a Central IT atua", 6 páginas de frente, plataforma CITSmart, resultado ADM 24h, sistemas em operação |
| Produto | Hyper Agents em 3 telas executivas |
| Fecho | contato |

**Dois arquivos importam:**

- `deck/hibrido.html`, o design e o movimento
- `conteudo/institucional.js` e `conteudo/hyper-agents.js`, só texto e números

A separação é o objetivo do projeto: o marketing edita o conteúdo e nunca abre o
design. Está funcionando, e foi demonstrado trocando uma frase sem tocar no HTML.

---

## 2. Como rodar

```
cd /Users/paullyannagomes/projects/comercial-central-it
python3 -m http.server 4500
```

Abra `http://localhost:4500/deck/hibrido.html`. No iPad, troque `localhost` pelo IP
do Mac (`ipconfig getifaddr en0`). O IP muda quando a rede muda, e isso já causou
confusão de "o servidor caiu" quando ele estava no ar.

**Precisa de servidor.** O deck usa módulo ES, e o navegador bloqueia `import` de
arquivo local por CORS. Abrir por duplo clique não funciona nessa versão.

**Para levar a cliente**, gere o arquivo único:

```
python3 empacota.py
```

Sai `output/institucional.html`, com Motion, fontes e imagens embutidos. Abre por
duplo clique, funciona sem internet, cabe em AirDrop.

---

## 3. Decisões tomadas, e por quê

**Rolagem vertical, não slides laterais.** O protótipo do Figma tem a seta
"Continua" apontando para baixo, então o desenho original rola. A versão lateral
ficou guardada em `deck/hibrido-lateral.html.bak`.

**Paleta medida do protótipo, não do documento.** Amostrando pixel das capturas:
fundo `#000214`, teal `#0ba1aa`, roxo `#4d1c75`. O documento de contexto traz outra
paleta (navy `#051744`, lime `#c4f542`), e a diferença entre as duas foi a causa da
primeira versão ter ficado "longe do esperado". O lima aparece só nos acentos do
bloco de produto, que é como o Figma usa.

**Sem animação de entrada no texto.** Ela falhou três vezes em máquina de cliente e
passava nos testes. Esconder por CSS ou por JS e depender de um gatilho significa
que, quando o gatilho não dispara, o slide fica em branco no meio da apresentação.
Não reintroduza sem uma forma de garantir que o pior caso seja "sem animação" e
nunca "sem texto".

**Imagens das frentes vêm do site**, de `/images/carrot-1/1..6.png`, com o
pareamento que está em `ExpertiseSection.astro`. Foram testadas três origens antes:
as do Figma (pareamento desconhecido), seis abstrações que gerei (bonitas, mas
comunicam menos que fotografia de pessoas) e enfim as do site.

**Hyper Agents em três telas**, não seis. A ordem é a tese, como funciona e onde se
aplica, o que muda e quem sustenta. O menu da própria página do site
(visão geral, como funciona, recursos, casos de uso, diferenciais, serviços) é um
roteiro melhor do que o que eu havia inventado.

---

## 4. Origem de cada conteúdo

| bloco | de onde veio |
|---|---|
| Frentes: nomes, frases de efeito, 4 pilares | telas do protótipo do Figma, conferidas contra `/especialidades/*` |
| Imagens das frentes | site, `/images/carrot-1/` |
| Hyper Agents inteiro | `src/pages/produtos/hyper-agents.astro` |
| Resultado (40, 33 RAs, gov.br) | case ADM 24h |
| Capa, plataforma, "em operação", fecho | **escrito por mim**, ainda sem revisão do comercial |

Os campos `espelho:` no arquivo de conteúdo guardam a frase original do site, para
apontar deriva quando alguém mudar lá e não trouxer para cá.

---

## 5. Pendências

**Conteúdo**
- Nove blocos ainda são texto meu, não do site. Levantei a cópia real do hero
  ("Colocamos inteligência em cada etapa, da estratégia à operação") e do
  CITSmart X², e não cheguei a substituir.
- O texto precisa de revisão de quem vende antes de ir a cliente.

**Imagem**
- As seis do site são 562x387 e aparecem num painel que pede 1020x1034. Pixelam no
  iPad. Ou consegue as originais, ou o painel encolhe, ou troca a fonte da imagem.

**Design**
- Na lista de frentes, o item ativo fica no meio e os já passados continuam acesos:
  confunde qual é o atual. Duas saídas propostas, nenhuma escolhida.
- A seção de frentes ocupa 460vh, quase um quarto da página. Quem rola rápido passa
  por cinco frentes sem ver.
- Numa página que rola, o cliente pode correr até o fim enquanto o vendedor fala da
  segunda tela. Foi decisão consciente, mas vale reavaliar depois de usar.

**Estrutura**
- Faltam layouts que o documento original lista: agenda, dor do cliente, case,
  comparativo, próximos passos.
- O molde de produto serve para outros produtos, e ainda não foi reaproveitado.

---

## 6. Material capturado

- `assets-figma/`, 192 imagens baixadas do CDN do protótipo, incluindo capturas
  reais de produto (CITSmart People, Gestão de Tarefas) e o símbolo da marca
- `assets-site/`, as seis das frentes
- `assets-gerados/`, oito imagens que gerei com `gpt-image-2`. Só duas estão em uso
- `gera-frentes.py`, o gerador, com os prompts por conceito e a lista do que é
  proibido pedir (mão de robô, executivo com holograma, cidade com chip)

O protótipo do Figma é público em `/proto/`, mas o arquivo não: a API responde 404
para a conta `paullyanne@gmail.com`, e a AbrilDesign não passa os editáveis.
Tudo o que veio de lá foi capturado do protótipo, com autorização sua.

---

## 7. Armadilhas que já custaram tempo

1. **Testar com clique de mouse não cobre toque.** O Safari do iOS não dispara
   `click` em `div` sem `cursor:pointer`. Teste com `hasTouch: true`.
2. **O empacotador só varria `url(...)` do CSS.** As imagens que vêm do arquivo de
   conteúdo ficavam de fora, e a peça saía sem elas. Já corrigido, mas confira o
   número de imagens no relatório do `empacota.py` ao adicionar arte nova.
3. **`motion` não tem bundle ESM pronto.** O `dist/es/index.mjs` é reexport de
   `framer-motion/dom`, que o navegador não resolve. É preciso empacotar com
   esbuild, e é o que `deck/vendor/motion.js` já é.
4. **O callback de `scroll()` do Motion não dispara com `source` próprio.** Use a
   forma com `animate()`, ou um ouvinte de rolagem comum.
5. **Chaves ficam em arquivo, nunca no chat.** OpenAI em
   `~/projects/social-agent/.env.local`, Figma em `~/.figma.env`.
