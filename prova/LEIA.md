# Prova de direção visual

Três slides, feitos para você julgar a direção antes de eu construir o deck inteiro.
Não é o produto final. É a resposta à pergunta "consegue fugir da cara de IA?".

## Como abrir

No Mac, abra `deck.html` no navegador. No iPad, mande o arquivo por AirDrop e abra
no Safari, ou sirva a pasta e acesse pelo endereço local.

Navegação: arrastar o dedo, tocar no terço esquerdo ou direito da tela, ou setas
do teclado quando estiver ensaiando no computador.

## O que está aplicado

**Palco fixo de 1280 por 900, contido na tela.** O mesmo desenho serve iPad de 11
polegadas, de 12.9 e a tela do notebook. Nada de layout que se reorganiza sozinho:
numa apresentação ao vivo, o vendedor precisa saber exatamente o que vai aparecer.

**Fontes da marca**, Sora para títulos e Spline Sans para texto, e os tokens do
documento de contexto: navy de fundo, lime como acento dominante, cyan secundário.

**O que tira a peça do padrão de grid de cards:**

- Geometria da marca em escala grande, cortada pela borda, em vez de fundo liso
- Hierarquia dentro da grade: a primeira frente ocupa o dobro e leva o acento lime,
  as outras cinco vêm menores. Seis iguais é o que dá cara de template
- Um número dominante ocupando meia tela no slide de resultado
- Respiro desigual, sem card com borda de 1px em volta de cada coisa

**Movimento a serviço da fala.** A cascata de entrada dispara na troca de slide, não
no carregamento, e é curta. Quem está falando não espera animação terminar.
Respeita `prefers-reduced-motion`.

**Toque de verdade.** Zonas de toque sem nada visível por cima do desenho, arraste
com o dedo, sem dependência de hover, sem seleção de texto acidental.

## O que ainda não está aqui

- Imagem e ilustração. O documento de contexto aponta isso como o que mais falta,
  e é onde o designer entra
- Os outros layouts: agenda, dor do cliente, arquitetura, case, planos, contato
- Conteúdo separado da arte, em arquivo próprio, que é o objetivo do sistema
- Modo apresentador e funcionamento sem internet, que importa em cliente

## Nota sobre as fontes

Sora e Spline Sans vêm do Google Fonts por link. Para funcionar sem internet no
iPad do vendedor, elas precisam ser embutidas no arquivo. É simples, e faço quando
a direção estiver aprovada.
