const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function generateSupportResponse(message, faqs) {
  const knowledgeBase = faqs
    .map(
      (faq) =>
        `Question: ${faq.question}\nAnswer: ${faq.answer}`
    )
    .join("\n\n");

  const prompt = `
You are an AI customer support agent.

Use ONLY the company's knowledge base to answer the customer.

COMPANY KNOWLEDGE BASE:
${knowledgeBase}

CUSTOMER QUESTION:
${message}

RULES:
1. Understand different ways of asking the same question.
2. Answer only when the knowledge base contains enough information.
3. Never invent information.
4. Do not use outside knowledge.
5. If the knowledge base does not contain enough information, mark the request as unresolved.
6. Return ONLY valid JSON.
7. Do not use markdown or code fences.

If you can answer:
{
  "resolved": true,
  "answer": "helpful answer"
}

If you cannot answer:
{
  "resolved": false,
  "answer": "I don't have enough information to resolve this issue."
}
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.2
  });

  const text = completion.choices[0].message.content;

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Invalid AI response:", text);

    return {
      resolved: false,
      answer: "I couldn't process that request."
    };
  }
}

module.exports = {
  generateSupportResponse
};