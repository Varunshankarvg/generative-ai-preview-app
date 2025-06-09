# 🧠 Generative AI Voice & Image UI Generator

This is a full-stack generative AI app that allows users to:
- 🎨 Generate UI code from text prompts using **Ollama + CodeLLaMA**
- 🖼️ Upload images to extract layout and generate responsive HTML using **LLaVA**
- 🎛️ Preview the output directly in the browser
- ⚡ Powered entirely by local AI models — no cloud APIs needed!

---

## 🏗️ Tech Stack

| Layer       | Tech                        |
|-------------|-----------------------------|
| Frontend    | Static HTML, JS, Tailwind CSS (in `/frontend/public`) |
| Backend     | Node.js + Express           |
| AI Engine   | [Ollama](https://ollama.com) (with CodeLLaMA & LLaVA models) |

---

## 📁 Folder Structure

generative-ai-preview-app/
├── backend/ # Express server for prompt → code/image caption → code
├── frontend/
│ └── public/ # Contains index.html, app.js, and preview pages
├── .gitignore


---

## 🚀 How to Run Locally

### 🔹 1. Start Ollama

Make sure you have Ollama installed: https://ollama.com  
Then run:

```bash
ollama run codellama
ollama run llava

2.Start the backend

bash
Copy
Edit
cd backend
npm install
node index.js

Runs on http://localhost:5000

Endpoints include:

POST /generate-ui (text prompt → code)

POST /generate-ui-from-image (image → caption → code)

🔹 3. Open the Frontend
Navigate to:

pgsql
Copy
Edit
frontend/public/index.html
Or use a local web server or VS Code “Live Server” extension

✨ Features
🧠 Text-to-UI with Tailwind CSS using CodeLLaMA

🖼️ Vision-based UI generation from images

💡 Works offline with local models (Ollama)

🔧 Built with Express and plain HTML/JS

