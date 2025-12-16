export type AISuggestion = {
  priority: "low" | "medium" | "high";
  category: string;
  urgency: string;
  reasoning?: string;
};

export async function analyzeTaskWithAI(
  title: string,
  description?: string
): Promise<AISuggestion> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const fullText = `${title} ${description || ""}`.toLowerCase();

  let priority: "low" | "medium" | "high" = "medium";
  let category = "geral";
  let urgency = "normal";
  let reasoning = "";

  const urgentKeywords = [
    "hoje",
    "amanhã",
    "urgente",
    "asap",
    "imediato",
    "agora",
    "prazo",
    "deadline",
    "entrega",
    "entregar",
    "preciso",
    "precisar",
  ];
  const hasUrgentTime = urgentKeywords.some((keyword) =>
    fullText.includes(keyword)
  );

  const highPriorityPatterns = [
    /trabalh/i,
    /faculd/i,
    /universidad/i,
    /prova/i,
    /exame/i,
    /apresenta/i,
    /reuni/i,
    /client/i,
    /chef/i,
    /entreg/i,
    /deadline/i,
    /prazo/i,
    /importante/i,
    /crític/i,
    /escol/i,
    /estud/i,
    /projet/i,
    /relatóri/i,
    /document/i,
    /defend/i,
    /avalia/i,
  ];

  const highPriorityCount = highPriorityPatterns.filter((pattern) =>
    pattern.test(fullText)
  ).length;

  const lowPriorityPatterns = [
    /lazer/i,
    /hobby/i,
    /pessoal/i,
    /quando der/i,
    /sem pressa/i,
    /opcional/i,
    /depois/i,
    /eventualmente/i,
  ];

  const lowPriorityCount = lowPriorityPatterns.filter((pattern) =>
    pattern.test(fullText)
  ).length;

  console.log("Análise IA:", {
    fullText,
    hasUrgentTime,
    highPriorityCount,
    lowPriorityCount,
  });

  if (hasUrgentTime) {
    priority = "high";
    urgency = "imediata";
    reasoning = "Tarefa com prazo próximo ou urgente";
  } else if (highPriorityCount > 0) {
    priority = "high";
    urgency = "média";
    reasoning = `Tarefa relacionada a trabalho/estudos - detectadas ${highPriorityCount} palavra(s)-chave de alta prioridade`;
  } else if (lowPriorityCount > 0) {
    priority = "low";
    urgency = "baixa";
    reasoning = "Tarefa pessoal ou sem urgência";
  } else {
    priority = "medium";
    urgency = "normal";
    reasoning = "Tarefa com prioridade moderada";
  }
  if (
    /trabalh/i.test(fullText) ||
    /escritóri/i.test(fullText) ||
    /reuni/i.test(fullText) ||
    /client/i.test(fullText) ||
    /projet/i.test(fullText)
  ) {
    category = "trabalho";
  } else if (
    /faculd/i.test(fullText) ||
    /universidad/i.test(fullText) ||
    /escol/i.test(fullText) ||
    /estud/i.test(fullText) ||
    /prova/i.test(fullText) ||
    /exame/i.test(fullText) ||
    /trabalho da/i.test(fullText) ||
    /entregar trabalho/i.test(fullText)
  ) {
    category = "estudos";
  } else if (
    /comprar/i.test(fullText) ||
    /mercado/i.test(fullText) ||
    /supermercado/i.test(fullText) ||
    /farmáci/i.test(fullText)
  ) {
    category = "compras";
  } else if (
    /exercíci/i.test(fullText) ||
    /academia/i.test(fullText) ||
    /correr/i.test(fullText) ||
    /treino/i.test(fullText)
  ) {
    category = "saúde";
  } else if (
    /pessoal/i.test(fullText) ||
    /lazer/i.test(fullText) ||
    /hobby/i.test(fullText)
  ) {
    category = "pessoal";
  }

  if (fullText.includes("amanhã") || fullText.includes("hoje")) {
    priority = "high";
    urgency = "imediata";
    reasoning = "Tarefa com prazo imediato - alta prioridade";
  }

  return {
    priority,
    category,
    urgency,
    reasoning,
  };
}
