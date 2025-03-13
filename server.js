import express from "express";
import bodyParser from "body-parser";
import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static("public")); // Serve static files (HTML, CSS, JS)

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/generate-response", async (req, res) => {
    try {
        const userInput = req.body.prompt;
        const result = await model.generateContent(userInput);
        const aiResponse = result.response.text();

        res.json({ response: aiResponse });
    } catch (error) {
        console.error("Error generating AI response:", error);
        res.status(500).json({ response: "Failed to generate response. Try again later." });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
