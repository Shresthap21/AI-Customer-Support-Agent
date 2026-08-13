# AI-Customer-Support-Agent

An AI-powered customer support application that uses a knowledge base and an LLM to answer customer questions, handle technical issues, and escalate unresolved problems into support tickets.

Built as a practical example of how a **Forward Deployed Engineer (FDE)** can turn a real-world business problem into a working technical solution.

## What This Project Does

The application simulates an AI customer support workflow:

1. A customer submits a question or technical issue.
2. The backend processes the request.
3. The application uses a company knowledge base to provide relevant information.
4. Groq-powered AI helps understand and respond to customer queries.
5. If the issue can be resolved, the customer receives an answer.
6. If the system doesn't have enough information, the issue can be escalated.
7. A support ticket is created for further investigation.
8. Support teams can view unresolved tickets through the ticket dashboard.

## Why This Is an FDE Project

Forward Deployed Engineers work closely with customers and business teams to understand real problems and build practical technical solutions around them.

This project demonstrates that workflow:

```text
Business Problem
      ↓
Understand Customer Workflow
      ↓
Identify Where AI Helps
      ↓
Connect Company Knowledge
      ↓
Build the Solution
      ↓
Handle Unresolved Issues
      ↓
Escalate to Support
```

The goal is to build a useful system around an actual business workflow.

## Features

- AI-powered customer support chat
- Company knowledge base
- Natural-language understanding with an LLM
- Knowledge-based answers
- Avoids inventing answers when information isn't available
- Support ticket creation
- Support ticket dashboard
- React frontend
- Node.js + Express backend
- Groq API integration

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- CSS

### Backend

- Node.js
- Express.js

### AI

- Groq API
- Large Language Model

### Data

- JSON knowledge base
- In-memory ticket storage

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/AI-Customer-Support-Agent.git
cd AI-Customer-Support-Agent
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file:

```env
GROQ_API_KEY=your_groq_api_key
```

Get your API key from:

https://console.groq.com/

### 3. Start the backend

```bash
node app.js
```

The backend will run on:

```text
http://localhost:5000
```

### 4. Set up the frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

## Try It Out

Once the application is running, try questions such as:

```text
How do I authenticate my API requests?
```

```text
The API keeps returning 429 when I send lots of requests.
```

```text
I forgot my password.
```

You can also test an issue that isn't covered by the knowledge base:

```text
My Salesforce OAuth integration is failing.
```

This demonstrates the escalation flow.

## Support Tickets

When the AI cannot confidently resolve an issue, the customer can create a support ticket.

Each ticket contains information such as:

```text
Ticket ID
Issue
Category
Priority
Status
Created At
```

The support dashboard allows unresolved customer issues to be viewed separately from automatically resolved conversations.

## API Endpoints

### Chat

```http
POST /chat
```

Request:

```json
{
  "message": "How do I authenticate my API requests?"
}
```

### Create Ticket

```http
POST /tickets
```

Request:

```json
{
  "message": "My Salesforce OAuth integration is failing."
}
```

### Get Tickets

```http
GET /tickets
```

Returns the currently created support tickets.

## Possible Improvements

This project intentionally keeps the architecture simple so it can be understood and built during a live session.

Possible future improvements include:

- Persistent database for tickets
- Authentication and authorization
- Retrieval-Augmented Generation (RAG)
- Vector database for larger knowledge bases
- AI-based ticket categorization
- Automatic ticket priority detection
- Agent dashboard
- Conversation history
- Analytics and support metrics
- Deployment to a cloud platform
