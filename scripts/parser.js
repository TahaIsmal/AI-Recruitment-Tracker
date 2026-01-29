const input = items[0].json;
let rawText = "";

if (input.content && input.content.parts && input.content.parts[0]) {
  rawText = input.content.parts[0].text;
} else if (input.message && input.message.content) {
  rawText = input.message.content;
} else {
  rawText = input.text || "";
}

if (!rawText || rawText.trim() === "") {
  return { name: "Pending Review", email: "check@hr.com", score: 0, analysis: "AI response empty" };
}

const cleanJsonText = rawText.replace(/```json|```/g, "").trim();

try {
  const start = cleanJsonText.indexOf('{');
  const end = cleanJsonText.lastIndexOf('}') + 1;
  const jsonOnly = cleanJsonText.substring(start, end);

  const data = JSON.parse(jsonOnly);

  return {
    name: data.name || "Unknown Candidate",
    email: data.email || "no-email@found.com",
    score: parseInt(data.score) || 0,
    analysis: data.analysis || "Processed"
  };
} catch (e) {

  return {
    name: "Format Error",
    email: "manual@check.com",
    score: 1,
    analysis: "AI returned text but not valid JSON: " + rawText.substring(0, 30)
  };
}