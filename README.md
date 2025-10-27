# 🧠 AI-Powered Notes App

> **Capture. Organize. Summarize with AI.**  
> A responsive, full-stack note-taking application with AI-powered summarization using **Google Gemini**.

[![Live Demo](https://img.shields.io/badge/Live_Demo-not3ai.vercel.app-000000?style=for-the-badge&logo=vercel)](https://not3ai.vercel.app)  
[![Swagger API Docs](https://img.shields.io/badge/API_Docs-SwaggerHub-85EA2D?style=for-the-badge&logo=swagger)](https://app.swaggerhub.com/apis-docs/YASERKT786/NoteAi/1.0.0)

---
## 🚀 Live Demo

- **URL**: [https://not3ai.vercel.app](https://not3ai.vercel.app)
- **Test Credentials**:
  - Email: `testuser@gmail.com`
  - Password: `TestUserPassword`

> 💡 Use these credentials to explore the app without registering.
---
## 📚 API Documentation

- **Interactive Docs**: [SwaggerHub - NoteAi API](https://app.swaggerhub.com/apis-docs/YASERKT786/NoteAi/1.0.0)
---
## 🎥 Demo Video
[![Watch the video](https://res.cloudinary.com/daz1e04fq/image/upload/v1761600247/Untitled_design_xfnbtz.png)](https://youtu.be/oeSGH1NwKd4)

---



## ✨ Features

- 🔐 **Secure Authentication**: Register & login with JWT (via NextAuth)
- 📝 **Full Note CRUD**: Create, read, update, delete notes
- 🤖 **AI Summarization**: Instantly summarize any note using **Google Gemini API**
- 🌓 **Dark/Light Theme**: Toggle between themes with system preference support
- 📱 **Fully Responsive**: Works on mobile, tablet, and desktop
- 🐳 **Docker Ready**: Containerized with Docker Compose
- 🛡️ **Input Validation**: Zod-powered validation with error feedback
- 🧪 **Clean Architecture**: Modular, maintainable codebase

---

## 🛠 Tech Stack

| Layer | Technologies |
|------|--------------|
| **Frontend** | Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, `next-themes` |
| **Auth** | NextAuth.js + Credentials Provider + JWT |
| **Backend** | Next.js API Routes (Node.js) |
| **Database** | MongoDB (Mongoose ODM) |
| **AI** | Google Gemini API (`@google/generative-ai`) |
| **DevOps** | Docker, Docker Compose, Vercel |
| **Styling** | Tailwind CSS, CSS Animations, Lucide React Icons |

---

## 📦 Setup Instructions

### Prerequisites

- Node.js ≥ 18
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- [Google Gemini API Key](https://aistudio.google.com/app/apikey)

---

### 🧪 Local Development (Without Docker)

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/ai-notes-app.git
   cd ai-notes-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local`:
   ```env
   MONGODB_URI="your_mongodb_atlas_uri"
   GEMINI_API_KEY="your_gemini_api_key"
   NEXTAUTH_SECRET="run: openssl rand -base64 32"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Run the app**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Frontend: http://localhost:3000
   - API Docs: [SwaggerHub](https://app.swaggerhub.com/apis-docs/YASERKT786/NoteAi/1.0.0)

---

### 🐳 Docker Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/ai-notes-app.git
   cd ai-notes-app
   ```

2. **Create `.env.local`**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` (same as above).  
   > ⚠️ **Important**: `NEXTAUTH_URL` must be `http://localhost:3000` for local Docker.

3. **Build and start containers**
   ```bash
   docker-compose up --build
   ```

4. **Access the app**
   - App: http://localhost:3000
   - MongoDB: `mongodb://localhost:27017/ainotes`

5. **Stop containers**
   ```bash
   docker-compose down
   # To delete DB data: docker-compose down -v
   ```

---

## 📁 Environment Variables

See `.env.example` for reference:

```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# AI Integration
GEMINI_API_KEY=your_gemini_api_key

# Auth (NextAuth)
NEXTAUTH_SECRET=strong_random_string_here
NEXTAUTH_URL=http://localhost:3000  # or your production URL
```

> 🔐 **Security**: Never commit `.env.local` to version control.

---

## 📚 API Documentation

- **Interactive Docs**: [SwaggerHub - NoteAi API](https://app.swaggerhub.com/apis-docs/YASERKT786/NoteAi/1.0.0)
- **Endpoints**:
  - `POST /api/auth/register` – Register user
  - `POST /api/auth/login` – Login (via NextAuth)
  - `GET /api/notes` – List notes
  - `POST /api/notes` – Create note
  - `GET /api/notes/{id}` – Get note
  - `PUT /api/notes/{id}` – Update note
  - `DELETE /api/notes/{id}` – Delete note
  - `POST /api/notes/{id}/summarize` – AI summarize

> 🔒 All `/notes` endpoints require authentication.

---

## 📂 Project Structure

```bash
ai-notes-app/

│── app/                   # Next.js App Router
│── components/            # Reusable UI (shadcn)
│── lib/                   # DB, auth, AI logic
│── models/                # Mongoose schemas
│── types/                 # TypeScript interfaces
├── public/                # Static assets
├── .env.example           # Env template
├── Dockerfile             # Multi-stage build
├── docker-compose.yml     # MongoDB + App
└── README.md
```

---

> ✨ **Built with ❤️ using Next.js, TypeScript, and Gemini AI**  
> **Deployed on Vercel** | **Database: MongoDB Atlas**
