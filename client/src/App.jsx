import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! How can I help you today?"
    }
  ]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!message.trim()) return;

  const userMessage = message.trim();

  setMessages((prev) => [
    ...prev,
    {
      role: "user",
      content: userMessage
    }
  ]);

  setMessage("");

  try {
    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: userMessage
      })
    });

    const data = await response.json();

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: data.answer || data.message
      }
    ]);
  } catch (error) {
    console.error("Error:", error);

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "Sorry, I couldn't connect to the support service."
      }
    ]);
  }
};

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>SupportAI</h1>
          <p>AI-powered customer support</p>
        </div>

        <span className="status">
          <span className="status-dot"></span>
          Online
        </span>
      </header>

      <main className="chat-container">
        <div className="chat-header">
          <h2>How can we help?</h2>
          <p>Ask us anything about your account or product.</p>
        </div>

        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.role}`}
            >
              <div className="message-label">
                {msg.role === "assistant" ? "SupportAI" : "You"}
              </div>

              <div className="message-content">
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        <form className="input-area" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Describe your issue..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button type="submit">
            Send
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;