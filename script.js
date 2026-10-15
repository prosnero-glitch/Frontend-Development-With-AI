const form = document.querySelector("#assistant-form");
const nameInput = document.querySelector("#userName");
const projectInput = document.querySelector("#projectType");
const toneInput = document.querySelector("#tone");
const greeting = document.querySelector("#greeting");
const promptText = document.querySelector("#promptText");
const status = document.querySelector("#assistantStatus");

const savedName = localStorage.getItem("ai-helper-name");
if (savedName) {
  nameInput.value = savedName;
  greeting.textContent = `Welcome back, ${savedName}.`;
}

function createPrompt(name, project, tone) {
  const toneText = {
    friendly: "warm and approachable",
    professional: "clean and business-ready",
    bold: "confident and eye-catching",
    minimal: "simple and elegant",
  }[tone];
  return `Hi ${name.trim() || "creator"}, create a ${toneText} ${project} interface with a navbar, hero section, and three reusable cards.`;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();
  const project = projectInput.value;
  const tone = toneInput.value;
  if (name) {
    localStorage.setItem("ai-helper-name", name);
    greeting.textContent = `Welcome back, ${name}.`;
  } else {
    localStorage.removeItem("ai-helper-name");
    greeting.textContent = "Welcome back, creator.";
  }
  promptText.textContent = createPrompt(name, project, tone);
  status.textContent = "Local personalized demo ready. Connect the secure OpenAI function for live text and DALL·E images.";
});