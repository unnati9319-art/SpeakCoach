import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `You are an experienced, encouraging spoken English coach helping non-native 
speakers improve their fluency. The user was given a topic, had 60 seconds to 
prepare, then spoke spontaneously. What you receive is a raw transcript of 
their spoken English — it may include filler words, run-on sentences, or 
informal patterns typical of unscripted speech. Do not penalize them as 
harshly as you would written text. Analyze the transcript and return feedback 
that helps them improve, without being discouraging. If the transcript is 
very short or empty, gently note that and encourage them to try again rather 
than giving harsh criticism. Respond ONLY in this exact JSON format, no extra 
text or markdown formatting:
{
  "grammar_issues": [{"original": "", "corrected": "", "note": ""}],
  "filler_word_count": 0,
  "fluency_comment": "",
  "vocabulary_suggestions": [{"used": "", "suggested": "", "reason": ""}],
  "structure_comment": "",
  "fluency_score": 0,
  "encouragement": ""
}`;

app.post('/api/feedback', async (req, res) => {
  try {
    const { transcript } = req.body;
    
    if (typeof transcript !== 'string') {
      return res.status(400).json({ error: 'Transcript is required and must be a string' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: transcript,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: 'application/json',
      }
    });

    const responseText = response.text;
    let feedback;
    try {
      feedback = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', responseText);
      return res.status(500).json({ error: 'Failed to parse feedback from AI.' });
    }

    res.json(feedback);

  } catch (error) {
    console.error('Error generating feedback:', error);
    res.status(500).json({ error: 'An error occurred while generating feedback. Please try again.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
