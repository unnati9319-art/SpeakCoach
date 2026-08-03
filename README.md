# SpeakCoach

SpeakCoach is an AI-powered spoken English practice tool. It allows non-native English speakers to practice speaking spontaneously on various topics and receive instant, structured feedback on their grammar, vocabulary, fluency, and structure.

## 🚀 Live Demo (Frontend)
The frontend of this application is deployed on GitHub Pages. 
*(Note: Because this architecture relies on a local Node.js backend to securely interface with the Gemini API, the live GitHub Pages demo is for UI showcase purposes. To use the full AI feedback functionality, the project must be run locally.)*

---

## 🛠️ Technology Stack Breakdown

This project is built using a modern, lightweight, and scalable stack. Here is a detailed breakdown of each technology and why it was chosen:

### 1. Frontend: React + Vite
- **React**: Used to build a dynamic, state-driven user interface. The app is designed as a seamless single-page application (SPA) with a clean 5-step flow (Landing → Topic Selection → Preparation → Recording → Feedback) managed entirely through React state without heavy routing libraries.
- **Vite**: Chosen over Create React App (CRA) for its blazing-fast Hot Module Replacement (HMR) and optimized build times. Vite serves the source code over native ES modules, making local development instantaneous.

### 2. Styling: Tailwind CSS
- **Tailwind CSS**: A utility-first CSS framework used to rapidly build a custom, minimal, and calming user interface. 
- **Design Philosophy**: By utilizing Tailwind's `slate` color palette and precise utility classes, the UI avoids the generic look of component libraries (like Bootstrap or MUI) and instead achieves a highly bespoke, premium, and stress-free aesthetic crucial for learning environments.

### 3. Audio Capture: Web Speech API (`SpeechRecognition`)
- **Web Speech API**: A native browser API that provides built-in speech recognition. 
- **Why it matters**: Instead of recording heavy audio files, sending them to a third-party server, and paying for transcription (like Whisper or Google Cloud Speech-to-Text), the Web Speech API transcribes the user's voice *locally in the browser* in real-time. This ensures zero latency transcription, zero audio hosting costs, and immediate visual feedback. *(Best supported in Google Chrome).*

### 4. Backend: Node.js + Express
- **Node.js & Express**: A lightweight backend server designed to do exactly one thing: act as a secure proxy bridge between the React frontend and the Gemini AI.
- **Security Architecture**: The backend is necessary to securely hold the `GEMINI_API_KEY`. If the frontend directly communicated with Google's servers, the secret API key would be exposed in the browser's network tab.

### 5. AI Engine: Google Gemini 1.5 Flash
- **Gemini API (`@google/genai`)**: Google's latest generative AI model is used to analyze the raw transcript.
- **Prompt Engineering**: The backend uses a highly specific System Prompt to ensure the AI acts as an *encouraging* coach. It specifically instructs the AI to expect unscripted, informal speech patterns (like run-on sentences and filler words) so it doesn't penalize the user as harshly as it would written text.
- **Structured JSON Output**: The AI is forced to return a strict JSON payload, which the frontend parses to render beautiful, distinct UI cards for Grammar, Vocabulary, and Fluency.

---

## 💻 Local Setup Instructions

To run the fully functional app locally with AI feedback, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- A Google Gemini API Key

### 1. Environment Setup
Rename the `.env.example` file in the root directory to `.env` and insert your API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

*(For convenience, a `start_app.bat` and `install_node.bat` script have been provided for Windows users to automate the setup process).*

### 2. Running the Backend
Open a terminal in the root directory and run:
```bash
cd backend
npm install
npm start
```
The Express server will start on `http://localhost:5000`.

### 3. Running the Frontend
Open a **new** terminal in the root directory and run:
```bash
cd frontend
npm install
npm run dev
```
Open the provided Vite local URL (typically `http://localhost:5173`) in **Google Chrome** to begin your practice!
