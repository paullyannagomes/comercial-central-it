# Contexto: sistema de apresentações Central IT

Handoff de conversa para o Claude Code. Cole este arquivo na raiz do projeto e peça ao Claude Code para ler antes de começar.

---

## 1. Problema que estamos resolvendo

O marketing depende do designer para qualquer atualização de material comercial. Hoje as peças moram no Figma. Trocar um número ou um bullet significa entrar na fila do designer, e isso trava a operação.

O comercial só consome o material. Quem edita é o marketing.

**Objetivo:** separar conteúdo de arte. O designer passa a ser dono do kit de layouts, não de cada deck. O marketing gera peça nova sem tocar em design.

---

## 2. Decisões já tomadas

- **Não migrar para PowerPoint.** O time que edita é marketing, não comercial. PPT resolveria o problema errado.
- **Deck como código**, na mesma lógica do site da Central IT: design system em tokens, layouts como componentes, conteúdo em arquivo separado.
- **Adobe Express como destino de edição visual**, para quem não quer mexer em código. O pipeline HTML para Express foi testado e funciona.
- **Claude Code como ambiente de trabalho**, porque permite iterar em cima do render em vez de entregar peça pronta e esperar julgamento.

---

## 3. Teste já executado (resultado real)

Gerei um one-pager executivo em HTML a partir do conteúdo de `centralit.com.br/sobre`, no design system da marca, e exportei para o Adobe Express.

**O que funcionou:**
- Importação para o Express gerou documento nativo editável. Cada texto virou caixa de texto, cards viraram formas com borda e raio, gradientes radiais de fundo sobreviveram.
- Layout preservado sem reposicionamento. Zero overflow.
- Pipeline completo levou poucos minutos.

**O que falhou:**
- **Qualidade visual.** O resultado ficou com cara de HTML padrão: grid uniforme de cards com borda de 1px, sem hierarquia de composição, sem imagem, sem ilustração. Esse é o problema central a resolver no repo.
- **Fontes da marca.** Sora e Spline Sans não existem no Adobe Fonts. Na exportação foram substituídas por Acumin Pro e Source Sans 3. Solução: subir as duas como fonte customizada no Brand Kit do Express, uma vez.

**Arquivos de referência:** `centralit-onepager.html` e `centralit-onepager-preview.png`.

---

## 4. Design system Central IT

### Fontes

```
https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Spline+Sans:wght@400;500;600;700&display=swap
```

- **Sora** (`--font-display`): títulos, eyebrows, números, botões, rótulos de UI
- **Spline Sans** (`--font-body`): textos corridos, parágrafos, descrições

Nunca usar Inter, Roboto, Arial ou system fonts.

### Tokens

```css
:root{
  --navy:#051744;
  --navy-card:#0e2a63;
  --navy-soft:#13316f;
  --lime:#c4f542;
  --cyan:#5dd3e8;
  --magenta:#ec1c8d;
  --ink:#0d1d3d;
  --white:#ffffff;
  --line:rgba(93,211,232,.16);
  --line-strong:rgba(93,211,232,.32);
  --txt-mid:rgba(255,255,255,.78);
  --txt-dim:rgba(255,255,255,.62);
  --ink-2:#41506e;
  --ink-3:#5d6b87;
  --ink-4:#8a97ad;
  --surf-line:#e6ecf6;
  --surf-soft:#f4f7fd;
  --r-xs:8px; --r-sm:10px; --r-md:14px; --r-lg:18px; --r-xl:24px; --r-pill:100px;
  --font-display:'Sora',sans-serif;
  --font-body:'Spline Sans',sans-serif;
  --ease:cubic-bezier(.22,1,.36,1);
}
```

### Cores de status

Fundo claro: sucesso `#16a34a`, info `#1d4ed8`, atenção `#d97706`, erro `#dc2626`, risco alto `#c4126f`.
Fundo escuro: use variantes luminosas do mesmo matiz, verde `#4ade80`, azul `#7da6ff`, âmbar `#fbbf24`, magenta `#f472b6`.

### Regra dos acentos

Lime é o dominante. Cyan e magenta são secundários e parcimoniosos. Nunca os três com o mesmo peso na mesma área. Em seção escura o eyebrow é lime ou cyan, em seção clara é magenta.

---

## 5. Regras de marca (não negociáveis)

- **CITSmart é a plataforma**, o guarda-chuva.
- **Produtos nunca são chamados de "plataforma".** CITSmart ITSM, CITSmart Contratos e afins são produto, solução, sistema ou módulo. Um produto roda sobre a plataforma CITSmart.
- **Hyper Agents e Autonomous AI são motores de IA**, não plataformas.
- **ITSM 5.0 é geração e visão**, não nome de produto.
- A palavra "plataforma" só aparece como "plataforma CITSmart".
- **Nunca escrever "Representação ilustrativa" ou "Dados fictícios"** em telas, dashboards ou mockups.
- **Sem travessão em nenhum texto.** Use vírgula, dois pontos, ponto, ou reescreva.
- Voz PT-BR direta, anti marketês, sem clichê. Frases curtas, verbos de ação.
- Não inventar métrica. Se o número não veio de fonte, não entra.

---

## 6. Restrições técnicas do pipeline para o Adobe Express

Descobertas no teste. Respeitar ao gerar HTML destinado ao Express.

### Suportado
- SVG inline (logos, ícones, ilustração vetorial, gráficos). **Este é o maior vetor de qualidade visual disponível.**
- Gradiente linear e radial simples
- `border-radius`, `box-shadow` simples, `transform` padrão
- `position: absolute` e `relative` dentro do canvas fixo
- Imagem em base64 inline

### Não suportado
- `backdrop-filter`, `filter: blur()`
- `mix-blend-mode` em cadeia
- `box-shadow` em múltiplas camadas
- Animação, transição, `@keyframes`, JavaScript
- `position: fixed` ou `sticky`
- Variáveis CSS (`var(--…)`) podem não resolver, inline os valores no arquivo de export
- SVG externo por URL, precisa ser inline

### Metadados obrigatórios no HTML de export

```html
<meta name="hz:slide-selector" content=".slide">
<meta name="hz:canvas-width" content="1920">
<meta name="hz:canvas-height" content="1080">
```

E em cada raiz: `<div class="slide" data-canvas-width="1920" data-canvas-height="1080">`

Canvas fixo com `width` e `height` explícitos. Nada de `min-height`, percentual ou `fit-content` na raiz.

### Sem geração de imagem por IA
O conector Adobe não expõe geração de imagem neste ambiente. Fontes de imagem viáveis: Adobe Stock (busca e licenciamento), Firefly dentro do próprio Express, ou arquivo fornecido pelo marketing.

---

## 7. Arquitetura proposta do repositório

```
decks-centralit/
├── tokens/           design system portado do site
├── layouts/          componentes de slide reutilizáveis
├── assets/
│   ├── svg/          ilustração autoral, padrões geométricos, ícones
│   └── img/          fotografia
├── content/          um arquivo por peça, só texto e números
├── build/            gera HTML, PDF e o pacote de export
└── output/
```

### Layouts mínimos a construir

capa, agenda, dor do cliente, solução, arquitetura, números, case, comparativo, planos, próximos passos, contato.

### Stack sugerida

Slidev (conteúdo em Markdown, tema customizado em CSS, export PDF nativo, modo apresentador) ou build próprio em Astro reaproveitando o que já existe do site. Decidir na primeira sessão.

---

## 8. O problema a resolver no repo

O pipeline funciona. O que falta é **craft visual**.

O que precisa ser construído, e é onde vale envolver o designer:

- Biblioteca de elementos gráficos em SVG: padrões geométricos, formas de acento, tratamento de borda, elementos que não sejam card retangular
- Composições que quebrem o grid uniforme: imagem sangrando, tipografia em escala assimétrica, sobreposição, respiro desigual
- Tratamento de imagem consistente com a marca

Modelo de trabalho: o designer desenha os elementos, o Claude Code codifica e reaplica. O padrão visual é dele, a velocidade é do marketing.

---

## 9. Primeiros comandos sugeridos no Claude Code

1. Ler este arquivo e o `centralit-onepager.html` de referência
2. Propor a estrutura de pastas e a stack, com justificativa
3. Portar os tokens do design system e validar com um render
4. Construir os três primeiros layouts (capa, números, seis frentes) e renderizar para revisão
5. Iterar no craft visual até o resultado sair do padrão de grid de cards
6. Só depois montar o build e o pipeline de export

---

## 10. Pendências de decisão

- Qual peça inaugura o repo: institucional ou comercial de produto
- Stack definitiva: Slidev ou Astro
- Se o designer entra na etapa de biblioteca gráfica (recomendado)
- Subir Sora e Spline Sans no Brand Kit do Express (as duas são open source, sem impedimento de licença)
