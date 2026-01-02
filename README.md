# GemSolver: The AI Screen Assistant

## Project Overview

**GemSolver** is a powerful AI assistant that extracts text from images and provides intelligent, instant responses. It seamlessly handles content from sources that prevent traditional copy-pasting, making information retrieval faster and more efficient.

<p align="center">
  <a href="https://www.youtube.com/watch?v=17AD3QISHU4&ab_channel=AfonsoManata" target="_blank">
    <img src="https://i.imgur.com/8YxVfXy.png" alt="GemSolver Demo Video" width="600">
  </a>
</p>

*Click the image to watch the demo.*

> **Note:** The thumbnail includes a “play button overlay” to mimic a YouTube preview for better visual appeal.

## Core Functionalities

* **Automatic Capture and Analysis:** Monitors a designated screenshots directory (e.g., the default "Screenshots" folder) and processes the most recent image automatically.
* **Text Extraction (OCR):** Uses `tesseract.js` to convert image-based text into digital format, ensuring high accuracy. Ideal for protected content where standard copy-paste fails.
* **Intelligent Response Generation:** Sends extracted text to Google’s `gemini-2.0-flash` model to generate concise, actionable answers.
* **Clipboard Automation:** Automatically copies AI-generated responses to the system clipboard for instant use.
* **Task Automation:** Reduces manual effort, streamlining information retrieval and boosting productivity.

## Technologies

* **Node.js:** Backend runtime environment.  
* **Google Gemini API (`@google/generative-ai`):** Access to state-of-the-art language models.  
* **Tesseract.js:** Optical Character Recognition for extracting text from images.  
* **dotenv:** Secure management of environment variables, including API keys.  
* **fs & path:** File system manipulation and directory management.  
* **clipboardy:** Clipboard integration for automated copy-pasting.

## Potential Use Cases

* **Bypass Copy Restrictions:** Extract text from sources that block traditional copy-paste.  
* **Students:** Quickly get answers from textbooks, slides, or exams in image form.  
* **Professionals:** Analyze reports, invoices, or charts where text isn’t selectable.  
* **Developers & Support:** Copy error messages or code snippets from images for fast solutions.  
* **General Users:** Automate information retrieval from any visual content.

## Getting Started

Follow these steps to run GemSolver locally:

1. **Clone the repository:**
    ```bash
    git clone [YOUR_REPOSITORY_LINK]
    cd [YOUR_REPOSITORY_NAME]
    ```
2. **Install dependencies:**
    ```bash
    npm install
    ```
3. **Configure Google Gemini API key:**
    Create a `.env` file in the project root:
    ```
    API_KEY="YOUR_GEMINI_API_KEY"
    ```
    Obtain your API key from [Google AI Studio](https://aistudio.google.com/).
4. **Run GemSolver:**
    ```bash
    node app.js
    ```

---

**GemSolver** streamlines text extraction and AI-based analysis from images, enabling fast, efficient workflows for students, professionals, and developers alike.
