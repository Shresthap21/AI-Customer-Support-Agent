const express = require("express");

const router = express.Router();

const tickets = [];

router.post("/", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      error: "Customer issue is required"
    });
  }

  const ticket = {
    id: tickets.length + 1001,
    issue: message,
    priority: "Medium",
    status: "Open",
    createdAt: new Date().toISOString()
  };

  tickets.push(ticket);

  res.status(201).json(ticket);
});

router.get("/", (req, res) => {
  res.json(tickets);
});

module.exports = router;