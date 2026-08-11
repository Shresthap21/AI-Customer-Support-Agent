const express = require("express");
const faqs = require("../data/faq.json");

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      error: "Message is required"
    });
  }

  try {
    const knowledgeBase = faqs
      .map(
        (item) =>
          `Title: ${item.title}
Category: ${item.category}
Information: ${item.answer}`
      )
      .join("\n\n");

const prompt = `
You are a technical customer support agent for a software company.

Your first task is to determine whether the customer's problem
can be answered using ANY information in the knowledge base.

The customer's wording does NOT need to match the documentation.
Interpret the customer's intent and connect it to the most relevant
knowledge-base entry.

For example:
- "My webhook isn't working" can relate to "Webhook Failures".
- "The API keeps giving me 429" can relate to "API Rate Limits".
- "Where do I put my API key?" can relate to "API Authentication"
  or "API Key Management".

Only mark the issue unresolved when the knowledge base genuinely
does not contain enough information to provide a useful answer.

IMPORTANT RULES:
1. Use ONLY the information provided in the knowledge base.
2. Do not invent product features, troubleshooting steps, or policies.
3. If the knowledge base contains enough information, answer clearly.
4. If it does not contain enough information, do not guess.
5. Keep answers concise and useful for a technical customer.

KNOWLEDGE BASE:

${knowledgeBase}

CUSTOMER QUESTION:

${message}

Return ONLY valid JSON in this exact format:

{
  "resolved": true,
  "category": "category name",
  "answer": "your answer",
  "source": "knowledge base title"
}

If the knowledge base genuinely cannot resolve the issue:

{
  "resolved": false,
  "category": "Unknown",
  "answer": "I don't have enough information in the available documentation to resolve this issue.",
  "source": null
}
`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.1
        })
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Groq API error:", error);

      return res.status(500).json({
        error: "AI service failed"
      });
    }

    const data = await response.json();

    const content = data.choices[0].message.content;

    const result = JSON.parse(content);

    res.json(result);
  } catch (error) {
    console.error("Chat error:", error);

    res.status(500).json({
      error: "Something went wrong while processing the request."
    });
  }
});

module.exports = router;