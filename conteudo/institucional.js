/**
 * Conteúdo da apresentação institucional.
 *
 * Só texto e números. Nada de arte, nada de layout. É este arquivo que o
 * marketing edita, e é o único lugar onde a cópia existe.
 *
 * A origem é o site (centralit.com.br), mas o texto é editado para fala:
 * slide é lido em voz alta enquanto alguém apresenta, e frase de site é
 * longa demais para isso. `espelho` guarda a frase do site como estava,
 * para a conferência apontar quando ela mudar lá e ninguém trouxe aqui.
 */
export const institucional = {
  capa: {
    titulo: "Mais inteligência, da estratégia à operação",
    apoio: "Conectamos pessoas, processos e tecnologia para que o essencial siga funcionando.",
    rodape: "Apresentação institucional",
    espelho: "Colocamos inteligência em cada etapa, da estratégia à operação.",
  },

  frentes: {
    titulo: "Onde a Central IT atua",
    apoio: "Seis frentes, a plataforma CITSmart por baixo de todas.",
    /* O site nomeia as seis assim. Aqui a frase é encurtada para caber na
       fala; `espelho` mantém a original para a conferência. */
    itens: [
      { n: "01", nome: "Transformação digital guiada por IA",
        fala: "Eficiência e valor em ciclos ágeis.",
        espelho: "Elevamos a eficiência e geramos valor para o seu negócio em ciclos ágeis." },
      { n: "02", nome: "Estratégia e transformação de negócios",
        fala: "Estratégia vira resultado.",
        espelho: "Transformamos estratégia em resultado, conectando processos, pessoas e tecnologia." },
      { n: "03", nome: "Eficiência em operações de negócio",
        fala: "Operações autônomas e semiautônomas.",
        espelho: "Aumentamos a produtividade com operações autônomas e semi-autônomas." },
      { n: "04", nome: "Operações de TI inteligentes",
        fala: "Resiliência para a TI, segurança para o negócio.",
        espelho: "Inteligência, resiliência e eficiência para sua TI. Segurança para o seu negócio." },
      { n: "05", nome: "Comunicação omnichannel inteligente",
        fala: "Canais conectados, interação vira relacionamento.",
        espelho: "Conectamos canais e inteligência para transformar interações em relacionamentos duradouros." },
      { n: "06", nome: "Soluções inovadoras",
        fala: "Ecossistema de produtos digitais.",
        espelho: "Um ecossistema de produtos digitais que entrega vantagens competitivas." },
    ],
  },


  /* Aprofundamento por frente, no molde da unica que existe no Figma:
     titulo, uma frase com o fecho em negrito, a frase de efeito na caixa
     teal e quatro pilares. Os pilares sao os das paginas de especialidade
     lidos das telas do prototipo, nao do site. Onde os dois divergem, como em
     Eficientizacao, vale o Figma: e a peca que o cliente aprovou. */
  /* As imagens sao as do proprio site, em /images/carrot-1/. O pareamento
     esta la e nao e escolha minha: 1 estrategia, 2 eficiencia, 3 transformacao
     digital, 4 TI, 5 omnichannel, 6 solucoes inovadoras. */
  detalhes: [
    {
      id: "transformacao-digital-guiada-por-ia",
      arte: "../assets-site/3.png",
      nome: "Transformação Digital guiada por IA",
      frase: ["Ampliamos eficiência e criamos diferenciais de valor", "em ciclos de 30 dias"],
      efeito: "Transformação digital é inteligência aplicada à geração de valor e à aceleração de resultados.",
      pilares: [
        { t: "Inovação contínua", d: "Tecnologia orientada a resultados." },
        { t: "Escalabilidade inteligente", d: "Crescimento rápido com estabilidade." },
        { t: "Valor acelerado", d: "Entregas ágeis com impacto real." },
        { t: "Evolução estratégica", d: "Inovação guiada por eficiência." },
      ],
    },
    {
      id: "estrategia-e-transformacao-de-negocios",
      arte: "../assets-site/1.png",
      nome: "Estratégia & Transformação de Negócios",
      frase: ["Transformamos estratégia em resultados,", "alinhando processos, pessoas e tecnologia"],
      efeito: "A estratégia só tem valor quando entrega resultado.",
      pilares: [
        { t: "Direção estratégica", d: "Alinhamos visão e resultado." },
        { t: "Inteligência organizacional", d: "Fortalecemos decisões e performance." },
        { t: "Capital humano e tecnológico", d: "Unimos pessoas e tecnologia para gerar vantagem." },
        { t: "Valor sustentável", d: "Foco no crescimento contínuo e relevante." },
      ],
    },
    {
      id: "eficiencia-em-operacoes-de-negocio",
      arte: "../assets-site/2.png",
      nome: "Eficiência em Operações de Negócio",
      frase: ["Aumentamos a produtividade com", "operações autônomas e semiautônomas"],
      efeito: "Eficiência é a capacidade de fazer mais com inteligência, ritmo e propósito.",
      pilares: [
        { t: "Eficiência corporativa", d: "Operações como motor de crescimento." },
        { t: "Integração estratégica", d: "Ecossistemas conectados gerando escala." },
        { t: "Agilidade empresarial", d: "Decisões rápidas com precisão." },
        { t: "Performance exponencial", d: "Impacto contínuo e mensurável." },
      ],
    },
    {
      id: "operacoes-de-ti-inteligentes",
      arte: "../assets-site/4.png",
      nome: "Operações de TI Inteligentes",
      frase: ["Inteligência, resiliência e eficiência para sua TI.", "Segurança para o seu negócio"],
      efeito: "Operações inteligentes são a base da continuidade, da segurança e da performance corporativa.",
      pilares: [
        { t: "Resiliência operacional", d: "Estabilidade com resposta imediata." },
        { t: "Inteligência preditiva", d: "Antecipação de falhas e eventos." },
        { t: "Gestão automatizada", d: "Eficiência contínua e segura." },
        { t: "Suporte estratégico", d: "TI alinhada ao negócio." },
      ],
    },
    {
      id: "comunicacao-omnichannel-inteligente",
      arte: "../assets-site/5.png",
      nome: "Comunicação Omnichannel Inteligente",
      frase: ["Conectamos canais e inteligência para transformar", "interações em relacionamentos duradouros"],
      efeito: "Comunicação é estratégica quando conecta pessoas, dados e propósito para fortalecer a relação entre empresas e seus públicos.",
      pilares: [
        { t: "Experiência corporativa", d: "Conexões que ampliam valor." },
        { t: "Engajamento inteligente", d: "Relacionamentos orientados a dados." },
        { t: "Comunicação estratégica", d: "Integração que impulsiona performance." },
        { t: "Presença omnichannel", d: "Consistência em cada interação." },
      ],
    },
    {
      id: "solucoes-inovadoras",
      arte: "../assets-site/6.png",
      nome: "Soluções Inovadoras",
      frase: ["Um ecossistema de produtos digitais", "que entrega vantagem competitiva"],
      efeito: "Orquestrar tecnologia, dados e inteligência para criar um ecossistema digital integrado, capaz de ampliar eficiência, competitividade e valor em toda a jornada organizacional.",
      pilares: [
        { t: "Integração inteligente", d: "Orquestração de soluções de ponta a ponta." },
        { t: "Arquitetura unificada", d: "Ecossistema modular e escalável." },
        { t: "Gestão ampliada", d: "Visão 360° de processos, pessoas e resultados." },
        { t: "Valor corporativo", d: "Impacto tangível e competitivo nos negócios." },
      ],
    },
  ],

  plataforma: {
    eyebrow: "A plataforma",
    titulo: "Tudo roda sobre a CITSmart",
    /* Regra de marca: CITSmart é a plataforma. Produto nunca é "plataforma". */
    linhas: [
      { chave: "Hyper Agents", texto: "agentes autônomos operando 24 por 7" },
      { chave: "Autonomous AI", texto: "decisão e ação dentro da própria operação" },
      { chave: "Mais de 20 produtos", texto: "do ITSM ao ERP público" },
    ],
    diagrama: {
      centro: "CITSmart X²",
      motores: ["Hyper Agents", "Autonomous AI"],
      produtos: ["ITSM", "ERP público", "Contratos", "Omnichannel"],
    },
  },

  /* Número vindo de case real. Regra do projeto: não inventar métrica. */
  resultado: {
    eyebrow: "Governo do Distrito Federal",
    valor: 40,
    nota: "serviços de zeladoria abertos pelo cidadão a qualquer hora, no Portal Cidadão.",
    apoios: [
      { chave: "33 RAs", texto: "administrações regionais no mesmo fluxo" },
      { chave: "gov.br", texto: "identidade federal, sem cadastro novo" },
      { chave: "No mapa", texto: "o cidadão marca o ponto e o endereço se preenche" },
    ],
    fonte: "centralit.com.br/cases/adm-24h",
  },

  operacao: {
    titulo: "Em operação, hoje",
    apoio: "Não é conceito. É o sistema rodando em cliente, com gente usando todo dia.",
    telas: [
      { arte: "../assets-figma/2be2a480.png", rotulo: "CITSmart People" },
      { arte: "../assets-figma/34fa633d.png", rotulo: "Gestão de tarefas por sprint" },
    ],
  },

  fecho: {
    titulo: "Vamos conversar sobre a sua operação",
    apoio: "Traga o problema que mais custa hoje. Saímos daqui com um caminho, não com uma proposta genérica.",
    site: "centralit.com.br",
  },
};
