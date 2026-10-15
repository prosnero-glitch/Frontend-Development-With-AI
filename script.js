const form = document.querySelector("#assistant-form");
const nameInput = document.querySelector("#userName");
const projectInput = document.querySelector("#projectType");
const toneInput = document.querySelector("#tone");
const greeting = document.querySelector("#greeting");
const promptText = document.querySelector("#promptText");
const status = document.querySelector("#assistantStatus");
const conceptImage = document.querySelector("#conceptImage");
const conceptNote = document.querySelector("#conceptNote");

const { createGreeting, createFallbackResponse } = window.AIHelperUtils;

function updateGreeting(name) {
  greeting.textContent = createGreeting(name);
}

function saveNamePreference(name) {
  if (name) {
    localStorage.setItem("ai-helper-name", name);
    return;
  }
  localStorage.removeItem("ai-helper-name");
}

function applyResult(result) {
  promptText.textContent = result.message;
  conceptImage.src = result.imageUrl;
  conceptImage.alt = result.imageAlt;
}

async function getAssistantResponse(payload) {
  const fallback = createFallbackResponse(payload);
  try {
    const response = await fetch("/.netlify/functions/ai-helper", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("Function response was not successful");
    }
    const data = await response.json();
    if (!data?.message) {
      throw new Error("Missing assistant message");
    }
    return data;
  } catch {
    return fallback;
  }
}

const savedName = localStorage.getItem("ai-helper-name");
if (savedName) {
  nameInput.value = savedName;
}
updateGreeting(savedName);

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const payload = {
    name: nameInput.value.trim(),
    projectType: projectInput.value,
    tone: toneInput.value,
  };
  saveNamePreference(payload.name);
  updateGreeting(payload.name);
  status.textContent = "Generating AI helper text...";

  const result = await getAssistantResponse(payload);
  applyResult(result);

  if (result.source === "openai") {
    status.textContent = "Generated securely with OpenAI via server-side function.";
    conceptNote.textContent = "Live OpenAI response delivered through a secure server route.";
    return;
  }

  status.textContent = "OpenAI unavailable, showing local fallback guidance.";
  conceptNote.textContent = "Fallback mode is active. Add OPENAI_API_KEY and run with Netlify for live AI output.";
});