const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const upload = multer({ dest: "uploads/" });

// Text Prompt → Code
app.post("/generate-ui", async (req, res) => {
  const { prompt } = req.body;

  try {
    const ollamaResponse = await axios.post("http://localhost:11434/api/generate", {
      model: "codellama",
      prompt: `Generate a responsive UI layout using Tailwind CSS based on this description: ${prompt}. Return only the code.`,
      stream: false,
    });

    res.json({ code: ollamaResponse.data.response });
  } catch (err) {
    console.error("Ollama Error:", err.message);
    res.status(500).json({ error: "Ollama backend failed" });
  }
});

// Image → Caption (LLaVA) → Prompt → Code
app.post("/generate-ui-from-image", upload.single("image"), async (req, res) => {
  const { imageUrl, style } = req.body;

  let imageData;

  try {
    if (req.file) {
      imageData = fs.readFileSync(req.file.path).toString("base64");
    } else if (imageUrl) {
      const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
      imageData = Buffer.from(response.data, "binary").toString("base64");
    } else {
      return res.status(400).json({ error: "No image or URL provided." });
    }

    // Step 1: Get caption from image using LLaVA
    const llavaRes = await axios.post("http://localhost:11434/api/generate", {
      model: "llava",
      prompt: "Describe this image as a UI layout. Be specific about UI elements.",
      stream: false,
      images: [imageData],
    });

    const caption = llavaRes.data.response;

    // Step 2: Generate UI from caption using CodeLlama
    let styledPrompt = caption;
    if (style === "tailwind") styledPrompt += " Use Tailwind CSS for styling.";
    else if (style === "daisyui") styledPrompt += " Use DaisyUI components.";
    else if (style === "flowbite") styledPrompt += " Use Flowbite layout and components.";
    else if (style === "vanilla") styledPrompt += " Use plain HTML and custom CSS.";

    const codeRes = await axios.post("http://localhost:11434/api/generate", {
      model: "codellama",
      prompt: `Based on this UI description: ${styledPrompt}. Generate the complete responsive HTML layout. Return only the code.`,
      stream: false,
    });

    res.json({ code: codeRes.data.response });

    if (req.file) fs.unlinkSync(req.file.path); // Clean up temp file
  } catch (err) {
    console.error("Image-based generation failed:", err.message);
    res.status(500).json({ error: "Image processing failed." });
  }
});

app.listen(port, () => {
  console.log(`🧠 Local Ollama backend running at http://localhost:${port}`);
});
