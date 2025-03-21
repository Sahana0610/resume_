const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const pdf = require("pdf-parse");
const cors = require("cors");

const app = express();
const port = 8000;

app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing

// Ensure uploads directory exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Setup multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } });

/**
 * Extract text from PDF
 */
const extractTextFromPDF = async (filePath) => {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);
        console.log("Extracted Text:", data.text); // Log the extracted text
        return data.text;
    } catch (error) {
        console.error("Error extracting PDF text:", error.message);
        return ""; // Return empty string instead of crashing
    }
};

/**
 * Optimize resume based on extracted text
 */
const optimizeResume = (resumeText) => {
    const normalizedText = resumeText.toLowerCase().replace(/[^a-z0-9\s]/g, ''); // Normalize text
    const suggestions = [];

    // Define skills and their variations
    const skills = [
        { name: "javascript", variations: ["javascript", "js"] },
        { name: "react", variations: ["react"] },
        { name: "node.js", variations: ["node.js", "nodejs", "node"] },
        { name: "python", variations: ["python"] },
        { name: "css", variations: ["css"] },
        { name: "sql", variations: ["sql"] },
    ];

    // Check for missing skills
    const missingSkills = skills.filter((skill) => {
        // Check if any variation of the skill is missing
        return !skill.variations.some((variation) => normalizedText.includes(variation));
    }).map((skill) => skill.name); // Extract only the skill name

    if (missingSkills.length > 0) {
        suggestions.push(`Consider adding these missing skills: ${missingSkills.join(", ")}`);
    }

    // Example: Ensure "Experience" and "Education" sections exist
    const hasExperience = /experience|work\s+history|professional\s+background/i.test(resumeText);
    const hasEducation = /education|academic\s+background|qualifications/i.test(resumeText);

    if (!hasExperience || !hasEducation) {
        suggestions.push('Consider adding sections like "Experience" or "Education".');
    }

    // Example: Check resume length
    const wordCount = normalizedText.split(/\s+/).filter(word => word.length > 0).length;
    console.log("Word Count:", wordCount); // Log the word count

    if (wordCount < 300) {
        suggestions.push("Consider expanding your resume for more detail.");
    } else if (wordCount > 1000) {
        suggestions.push("Consider condensing your resume to be more concise.");
    }

    return suggestions;
};

/**
 * File Upload API
 */
app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = `uploads/${req.file.filename}`;

    // Ensure the file exists before processing
    if (!fs.existsSync(filePath)) {
        return res.status(500).json({ error: 'Uploaded file not found' });
    }

    try {
        const resumeText = await extractTextFromPDF(filePath);
        const optimizedSuggestions = optimizeResume(resumeText);

        res.json({ message: 'File uploaded successfully', extractedText: resumeText, suggestions: optimizedSuggestions });
    } catch (error) {
        res.status(500).json({ error: 'Error extracting text from resume' });
    }
});

/**
 * Start server
 */
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});