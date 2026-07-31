# ⚡ InterQ — AI Interview Intelligence & Question Generator

An AI-powered web application that analyzes target job descriptions alongside candidate resumes or self-descriptions to generate personalized interview strategies, technical/behavioral question sets, skill gap assessments, and tailored preparation roadmaps.

---

## ✨ Key Features

- 📄 **Resume PDF & DOCX Parsing:** Seamlessly upload your resume with real-time file status indicators, size indicators, and progress tracking.
- 🎯 **Target Job Alignment:** Analyzes target job descriptions to extract key skill requirements and match scores.
- 🤖 **AI-Powered Question Generation:** Uses **Google Gemini AI** to generate tailored technical and behavioral questions with interviewer intentions and model answers.
- 🎛️ **Custom Question Counts & Live Refresh:** Choose between 5, 10, 15, 20, or 25 questions and click **Refresh Questions** anytime to generate fresh sets of questions on demand.
- 🗺️ **Personalized Preparation Roadmap:** Day-by-day customized study plan focused on closing identified skill gaps.
- 📥 **Tailored Resume PDF Export:** Generate and download ATS-optimized PDF resumes tailored to specific job descriptions.
- 🔐 **Secure Authentication:** JWT authentication with cookie support and MongoDB session storage.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, Sass (SCSS), React Router v7, Axios
- **Backend:** Node.js, Express.js (v5), Mongoose (MongoDB Atlas)
- **AI Integration:** Google GenAI SDK (`@google/genai` - Gemini 2.0 / 3.0 models)
- **Document Processing & Export:** `pdf-parse`, `puppeteer`
- **Validation & Schemas:** Zod

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas database (or local MongoDB)
- Google Gemini API Key (Get a free key from [Google AI Studio](https://aistudio.google.com/app/apikey))

---

### 📥 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ankurdotio/interview-ai-yt.git
   cd interview-ai-yt
   ```

2. **Backend Setup:**
   ```bash
   cd Backend
   npm install
   ```
   Create a `.env` file in the `Backend` directory (refer to `.env.example`):
   ```env
   PORT=3000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/interview-ai?retryWrites=true&w=majority
   JWT_SECRET=your_secret_jwt_key
   GOOGLE_GENAI_API_KEY=your_gemini_api_key
   ```

3. **Frontend Setup:**
   ```bash
   cd ../Frontend
   npm install
   ```

---

### 💻 Running the Application

1. **Start the Backend Server:**
   ```bash
   cd Backend
   npm run dev
   ```
   *Backend runs at: `http://localhost:3000`*

2. **Start the Frontend Dev Server:**
   ```bash
   cd Frontend
   npm run dev
   ```
   *Frontend app opens at: `http://localhost:5173/`*

---

## 🛡️ License
Distributed under the ISC License.
