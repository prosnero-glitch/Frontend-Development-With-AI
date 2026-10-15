const test = require("node:test");
const assert = require("node:assert/strict");

const {
  createGreeting,
  createPrompt,
  createFallbackResponse,
} = require("../ai-helper-utils");

test("createGreeting handles empty and non-empty names", () => {
  assert.equal(createGreeting("Prosper"), "Welcome back, Prosper.");
  assert.equal(createGreeting("   "), "Welcome back, creator.");
});

test("createPrompt includes defaults and reusable components guidance", () => {
  const prompt = createPrompt("", "dashboard", "friendly");
  assert.match(prompt, /Hi creator/);
  assert.match(prompt, /navbar, hero section, and three reusable cards/i);
});

test("createFallbackResponse returns local fallback payload", () => {
  const payload = createFallbackResponse({ name: "Ava", projectType: "portfolio", tone: "minimal" });
  assert.equal(payload.source, "fallback");
  assert.match(payload.message, /portfolio interface/i);
  assert.match(payload.imageAlt, /portfolio/i);
  assert.match(payload.imageUrl, /^https:\/\/images\.unsplash\.com/);
});
