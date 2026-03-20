# ZOO AI
# AI Text Summarizer

## Overview

This project is a simple full-stack application that converts unstructured text into a structured summary using a Large Language Model (LLM).

It extracts:

* A one-sentence summary
* Three key points
* Sentiment (positive / neutral / negative)

---

## Tech Stack

* Frontend: React (Vite + TypeScript)
* Backend: Node.js + Express
* LLM: Google Gemini API

---

## Features

* Accepts raw text input
* Sends data securely to backend
* Uses LLM to generate structured output
* Displays results in a clean UI
* Handles errors gracefully

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-link>
cd <project-folder>
```

### 2. Backend setup

```bash
cd server
npm install
```

Create `.env` file:

```
GEMINI_API_KEY=your_api_key_here
```

Run backend:

```bash
node index.js
```

---

### 3. Frontend setup

```bash
cd client
npm install
npm run dev
```

---

## API Endpoint

### POST /api/summarize

Request:

```json
{
  "text": "your input text"
}
```

Response:

```json
{
  "summary": "...",
  "keyPoints": ["...", "...", "..."],
  "sentiment": "positive"
}
```

---

## Prompt Design

The prompt enforces strict JSON output with:

* fixed structure
* limited fields
* controlled sentiment labels

This reduces parsing errors and ensures consistent responses.

---

## Trade-offs & Decisions

* Used backend for API calls to protect API keys
* Chose minimal UI to focus on functionality
* Used regex-based JSON extraction to handle imperfect LLM responses
* Skipped authentication due to assignment scope

---

## Future Improvements

* File upload support
* Batch processing
* Custom output formats
* Better UI styling

---

## Example Output

Input:
"AI is transforming industries by automating tasks and improving efficiency."

Output:

* Summary: AI is transforming industries by automating tasks and improving efficiency.
* Key Points:

  * AI is transforming industries
  * Automating tasks
  * Improving efficiency
* Sentiment: positive
