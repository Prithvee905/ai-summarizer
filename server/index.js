import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.post("/api/summarize", async (req, res) => {
  const text = req.body?.text?.trim();

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
Convert this text into strict JSON:

{
 "summary": "one sentence",
 "keyPoints": ["point 1", "point 2", "point 3"],
 "sentiment": "positive | neutral | negative"
}

Text:
${text}
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Extract JSON safely
    let jsonString;
    try {
      jsonString = response.match(/\{[\s\S]*\}/)[0];
    } catch {
      return res.status(500).json({ error: "Could not extract JSON" });
    }

    let parsed;
    try {
      parsed = JSON.parse(jsonString);
    } catch {
      return res.status(500).json({ error: "Invalid JSON" });
    }

    res.json(parsed);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to summarize" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});