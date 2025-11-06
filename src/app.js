require('dotenv').config(); // Loads environment variables (like API keys) from a .env file.
const { recognize } = require('tesseract.js'); // Tesseract.js for Optical Character Recognition (OCR).
const fs = require("fs"); // Node.js File System module for file operations.
const path = require("path"); // Node.js Path module for handling file paths.
const clipboardy = require('clipboardy'); // Utility to copy text to the system clipboard.
const { GoogleGenerativeAI } = require('@google/generative-ai'); // Official Google SDK for Gemini API interaction.

// --- Configuration & Initialization ---
// Global variables and Gemini client setup.
const API_KEY = process.env.API_KEY; // Gemini API key loaded from .env.
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms)); // Pause function for flow control.
// Defines the screenshot directory to monitor (cross-platform compatible).
const dir = path.join(process.env.HOME || process.env.USERPROFILE, "Desktop", "Screenshots");

// Initializes the Gemini client with the "gemini-2.0-flash" model for fast responses.
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// --- Utility Functions ---
// Helper functions for file system operations and API interactions.

/**
 * Deletes all files within a specified directory.
 * Used to clear the screenshot folder after processing.
 * @param {string} directory - The path to the directory.
 */
function removeallfiles(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const filepath = path.join(directory, file);
    fs.unlinkSync(filepath);
  }
}

/**
 * Gets the path of the most recently modified screenshot in a directory.
 * @param {string} directory - The path to the screenshot directory.
 * @returns {string} The full path to the latest screenshot.
 */
function get_last_screenshot(directory) {
  const files = fs.readdirSync(directory).sort((a, b) => {
    return fs.statSync(path.join(directory, b)).mtime - fs.statSync(path.join(directory, a)).mtime;
  });
  return path.join(directory, files[0]);
}

/**
 * Extracts text from an image using Tesseract.js (OCR).
 * @param {string} imagePath - The path to the image.
 * @returns {Promise<string>} The extracted text.
 */
const getTextFromImage = async (imagePath) => {
  try {
    const { data: { text } } = await recognize(imagePath, 'eng');
    return text;
  } catch (error) {
    console.error("Error extracting text from image:", error);
    throw error;
  }
};

/**
 * Sends a question to the Gemini AI model and copies the answer to the clipboard.
 * Formats the prompt for direct answers (e.g., just the letter for multiple choice).
 * @param {string} question - The question to send to Gemini.
 * @returns {Promise<string>} The Gemini's response.
 */
const askGemini = async (question) => {
  const prefix = "If this is a multiple choice question, give me only the letter of the correct answer.";
  const suffix = "If not, provide the answer without any explanations.";
  const prompt = `${prefix}${suffix}----> ${question}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const answer = response.text().trim();

  await clipboardy.write(answer);
  console.log("Correct Answer:", answer);
  console.log("The correct answer is in your clipboard. (Ctrl + V to paste)");

  return answer;
};

// --- Main Execution Loop ---
// Continuously monitors the screenshot folder, processes new images, and interacts with the AI.
(async () => {
  try {
    console.log("Using Gemini API. Waiting for screenshots. Type Ctrl+C to Stop.");
    while (true) { // Infinite loop for continuous monitoring.
      const files = fs.readdirSync(dir);
      await sleep(500); // Short pause to prevent excessive CPU usage.

      if (files.length !== 0) { // Check for new files in the folder.
        const image = get_last_screenshot(dir); // Get the latest screenshot.

        const text = await getTextFromImage(image); // Extract text from the screenshot.

        await askGemini(text); // Send text to Gemini and get a response.

        console.log("Waiting for screenshots. Type Ctrl+C to Stop.");
        removeallfiles(dir); // Clear the folder for the next screenshot.
      }
    }
  } catch (error) {
    console.error('An unexpected error occurred:', error);
  }
})();
