/**
 * Hyper Agents, apresentação executiva em três telas.
 *
 * Antes eram seis, no molde do Figma. Executivo não tem seis telas de
 * paciência para um produto: tem três perguntas. O que é e por que agora,
 * como funciona e onde se aplica, o que muda e quem sustenta.
 *
 * A cópia vem de centralit.com.br/produtos/hyper-agents, cuja própria
 * navegação (visão geral, como funciona, recursos, casos de uso,
 * diferenciais, serviços) já é o roteiro que o time escreveu.
 *
 * Regra de marca: CITSmart é a plataforma. Hyper Agents é motor de IA.
 */
export const hyperAgents = {
  /* 1 ─ a tese */
  tese: {
    marca: "CITSmart X²",
    produto: "Hyper Agents",
    /* A frase e a do site, com o meio em destaque como la. */
    titulo: ["Orquestre agentes de IA", "para automatizar fluxos,", "decisões e operações."],
    texto:
      "Combina modelos de IA, documentos, APIs e sistemas corporativos para executar fluxos complexos de forma autônoma ou assistida, com governança de ponta a ponta.",
    /* As tres provas do hero do site, e a primeira e a que mais pesa numa
       decisao executiva: nao amarra a empresa a um fornecedor de modelo. */
    provas: [
      { v: "Multi-LLM", r: "sem lock-in de modelo de IA" },
      { v: "24×7", r: "agentes executando em background" },
      { v: "100%", r: "rastreabilidade de cada ação" },
    ],
  },

  /* 2 ─ como funciona e onde se aplica */
  como: {
    titulo: "Do contexto à ação rastreada",
    apoio: "Cinco etapas. A última alimenta a primeira.",
    passos: [
      { n: "01", t: "Recebe contexto", d: "Documentos, bases, dados de sistemas e o objetivo do fluxo." },
      { n: "02", t: "Analisa e decide", d: "Aplica as regras definidas e determina a ação." },
      { n: "03", t: "Aciona sistemas", d: "APIs, bases de dados, arquivos, sistemas externos." },
      { n: "04", t: "Executa o fluxo", d: "Sozinho, ou aguardando validação humana." },
      { n: "05", t: "Registra e aprende", d: "Contexto, critério e resultado, sempre auditáveis." },
    ],
    areasTitulo: "Onde já se aplica",
    areas: [
      { t: "Comercial", d: "Qualificação de leads e propostas." },
      { t: "Jurídico", d: "Análise de contratos e riscos." },
      { t: "Suporte", d: "Diagnóstico em tempo real, menor MTTR." },
      { t: "Operações", d: "Hiperautomação de fluxos complexos." },
      { t: "Financeiro", d: "Auditorias assistidas." },
      { t: "Tecnologia", d: "Copilotos e produtividade técnica." },
      { t: "Marketing", d: "Conteúdo e campanhas personalizadas." },
      { t: "Backoffice", d: "Rotinas administrativas, menos retrabalho." },
    ],
  },

  /* 3 ─ o que muda, e quem sustenta */
  muda: {
    titulo: "O que muda na operação",
    resultados: [
      { t: "Menos tempo, mais decisão", d: "O que dependia de horas de análise manual passa a segundos." },
      { t: "Escala sem aumentar equipe", d: "Agentes operam em paralelo e absorvem volume." },
      { t: "Menos erro humano", d: "Triagem e resposta com consistência que gente não sustenta." },
      { t: "ROI desde o primeiro fluxo", d: "Cada agente em produção já reduz custo operacional." },
    ],
    servicoTitulo: "E a Central IT não entrega só a tecnologia",
    servicos: [
      "Diagnóstico dos fluxos onde o retorno aparece primeiro",
      "Implantação assistida, do experimento à produção",
      "Governança, aprovação e auditoria para setor regulado",
      "Integração aos seus sistemas, bases e identidade",
      "Sustentação com SLA no Brasil e suporte local",
      "Capacitação do seu time para operar com autonomia",
    ],
    tela: "../assets-figma/2be2a480.png",
  },
};
