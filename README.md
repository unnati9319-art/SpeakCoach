# SpeakCoach

An AI-powered spoken English practice tool. This is a minimal MVP that allows users to practice speaking on different topics and receive structured feedback on grammar, vocabulary, fluency, and structure using Google's Gemini API and the browser's Web Speech API.

## Project Structure

- `/frontend` - React + Vite + Tailwind CSS app
- `/backend` - Node.js + Express server

## Prerequisites

- Node.js (v18+ recommended)
- A Google Gemini API Key

## Setup Instructions

### 1. Environment Setup
In the root directory, there is a `.env.example` file. 
Rename it or copy it to `.env` and add your Gemini API key:
```
GEMINI_API_KEY=your_key_here
```
*(Note: A `.env` file might already be created if you provided your key during generation).*

### 2. Backend Setup
Open a terminal and navigate to the `/backend` folder:
```bash
cd backend
npm install
npm start
```
The backend server will run on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal and navigate to the `/frontend` folder:
```bash
cd frontend
npm install
npm run dev
```
The frontend will start and give you a local URL (usually `http://localhost:5173`). Open that URL in Google Chrome.

## Important Note on Browsers
The speech-to-text functionality relies on the **Web Speech API (`SpeechRecognition`)**. For the best and most consistent experience, please use **Google Chrome**.

## Features

- **No Auth / No DB**: Simple, instant access.
- **Real-time Transcription**: See your words as you speak them.
- **Smart Feedback**: Detailed breakdown of your speech by an encouraging AI coach.
