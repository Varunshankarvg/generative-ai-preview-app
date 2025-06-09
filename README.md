
# 🧠 Generative AI Voice & Image UI Generator

This is a full-stack generative AI app that allows users to:
- 🎨 Generate UI code from text prompts using **Ollama + CodeLLaMA**
- 🖼️ Upload images to extract layout and generate responsive HTML using **LLaVA**
- 🎛️ Preview the output directly in the browser
- ⚡ Powered entirely by local AI models — no cloud APIs needed!

---

## 🏗️ Tech Stack

| Layer     | Tech                                           |
|-----------|------------------------------------------------|
| Frontend  | Static HTML, JS, Tailwind CSS (`/frontend/public`) |
| Backend   | Node.js + Express                              |
| AI Engine | [Ollama](https://ollama.com) (CodeLLaMA, LLaVA) |

---

## 📁 Folder Structure

```
generative-ai-preview-app/
├── backend/      # Express server for prompt → code/image caption → code
├── frontend/
│   └── public/   # Contains index.html, app.js, and preview pages
├── .gitignore
├── README.md
```

---

## 🚀 How to Run Locally

### 🔹 1. Start Ollama

Make sure you have [Ollama installed](https://ollama.com), then run:

```bash
ollama run codellama
ollama run llava
```

---

### 🔹 2. Start the Backend

```bash
cd backend
npm install
node index.js
```

- Runs on: `http://localhost:5000`
- Endpoints:
  - `POST /generate-ui` → Text prompt → UI code
  - `POST /generate-ui-from-image` → Image → Caption → Code

---

### 🔹 3. Open the Frontend

Open directly in browser:
```
frontend/public/index.html
```

Or use Live Server (VS Code extension).

---

## ✨ Features

- 🧠 Text-to-UI with Tailwind CSS using CodeLLaMA
- 🖼️ Vision-based UI generation from images (LLaVA)
- 💡 100% local execution with Ollama (no cloud APIs)
- 🔧 Built with Express and plain HTML/JS
