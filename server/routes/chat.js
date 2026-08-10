const express = require("express");
const faqs = require("../data/faq.json");
const { generateSupportResponse } = require("../services/ai");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    const response = await generateSupportResponse(
      message,
      faqs
    );

    res.json(response);
  } catch (error) {
    console.error("Chat error:", error);

    res.status(500).json({
      error: "Something went wrong"
    });
  }
});

module.exports = router;