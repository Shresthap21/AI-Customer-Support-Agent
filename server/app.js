require("dotenv").config();

const express = require("express");
const cors = require("cors");

const chatRoute = require("./routes/chat");
const ticketRoute = require("./routes/tickets");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "AI Customer Support Agent API is running"
  });
});

app.use("/chat", chatRoute);
app.use("/tickets", ticketRoute);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});