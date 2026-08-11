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

  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage
      }
    ]);

    setMessage("");
    setLoading(true);

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
          content: data.answer || "Something went wrong.",
          resolved: data.resolved,
          category: data.category,
          source: data.source,
          originalMessage: userMessage
        }
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't connect to the support service."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const createTicket = async (issue) => {
    try {
      const response = await fetch("http://localhost:5000/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: issue
        })
      });

      const ticket = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `I've created support ticket #${ticket.id}. Our team can investigate this issue further.`,
          ticketCreated: true
        }
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I couldn't create the support ticket. Please try again."
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

        <div className="status">
          <span></span>
          Online
        </div>
      </header>

      <main className="chat-container">
        <div className="intro">
          <h2>How can we help?</h2>
          <p>
            Ask us anything about our product or technical integrations.
          </p>
        </div>

        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-wrapper ${
                msg.role === "user" ? "user-message" : "assistant-message"
              }`}
            >
              <div className="sender">
                {msg.role === "user" ? "You" : "SupportAI"}
              </div>

              <div className="message">
                {msg.content}
              </div>

              {msg.role === "assistant" &&
                msg.resolved &&
                msg.source && (
                  <div className="source">
                    Source: {msg.source}
                  </div>
                )}

              {msg.role === "assistant" &&
                msg.resolved === false && (
                  <button
                    className="ticket-button"
                    onClick={() => createTicket(msg.originalMessage)}
                  >
                    Create Support Ticket
                  </button>
                )}
            </div>
          ))}

          {loading && (
            <div className="message-wrapper assistant-message">
              <div className="sender">SupportAI</div>
              <div className="message">Thinking...</div>
            </div>
          )}
        </div>

        <div className="input-area">
          <input
            type="text"
            placeholder="Describe your issue..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />

          <button onClick={sendMessage} disabled={loading}>
            {loading ? "..." : "Send"}
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;