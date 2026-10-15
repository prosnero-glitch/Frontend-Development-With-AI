const { createFallbackResponse, createPrompt } = require("../../ai-helper-utils");

const OPENAI_API_URL = "https://api.openai.com/v1/responses";

function readInput(eventBody) {
  const parsed = eventBody && typeof eventBody === "string" ? JSON.parse(eventBody) : eventBody || {};
  return {
    name: (parsed.name || "").trim(),
    projectType: parsed.projectType || "dashboard",
    tone: parsed.tone || "friendly",
  };
}

async function getOpenAIResponse({ name, projectType, tone }, apiKey) {
  const prompt = createPrompt(name, projectType, tone);
  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      input: `${prompt} Return one concise paragraph with actionable UI guidance.`,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.output_text && data.output_text.trim();
}

exports.handler = async (event) => {
  try {
    const input = readInput(event.body);
    const fallback = createFallbackResponse(input);
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fallback, source: "fallback-missing-key" }),
      };
    }

    try {
      const message = await getOpenAIResponse(input, apiKey);
      if (!message) {
        throw new Error("Empty OpenAI response");
      }
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          imageUrl: fallback.imageUrl,
          imageAlt: fallback.imageAlt,
          source: "openai",
        }),
      };
    } catch {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fallback, source: "fallback-openai-unavailable" }),
      };
    }
  } catch {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Invalid request payload" }),
    };
  }
};
