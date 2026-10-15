(function (globalScope) {
  const TONE_TEXT = {
    friendly: "warm and approachable",
    professional: "clean and business-ready",
    bold: "confident and eye-catching",
    minimal: "simple and elegant",
  };

  function sanitizeName(name) {
    return typeof name === "string" ? name.trim() : "";
  }

  function createGreeting(name) {
    const safeName = sanitizeName(name);
    return safeName ? `Welcome back, ${safeName}.` : "Welcome back, creator.";
  }

  function createPrompt(name, project, tone) {
    const safeName = sanitizeName(name) || "creator";
    const safeProject = project || "product";
    const toneText = TONE_TEXT[tone] || "balanced and clear";
    return `Hi ${safeName}, create a ${toneText} ${safeProject} interface with a navbar, hero section, and three reusable cards.`;
  }

  function buildFallbackImage(projectType) {
    const safeProject = encodeURIComponent(projectType || "frontend ui");
    return `https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=85&sat=-20&blend=7a1f30&blend-mode=multiply&blend-alpha=12&txt=${safeProject}&txt-color=ffffff&txt-size=42`;
  }

  function createFallbackResponse({ name, projectType, tone }) {
    return {
      message: `${createPrompt(name, projectType, tone)} Start with mobile-first spacing, clear call-to-action buttons, and concise helper text in the form.`,
      imageUrl: buildFallbackImage(projectType),
      imageAlt: `Fallback concept preview for a ${projectType || "frontend"} interface`,
      source: "fallback",
    };
  }

  const exportsObject = {
    createGreeting,
    createPrompt,
    createFallbackResponse,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = exportsObject;
  }

  if (globalScope) {
    globalScope.AIHelperUtils = exportsObject;
  }
})(typeof window !== "undefined" ? window : globalThis);
