# AI-Recruitment-Tracker

# 🚀 AI-Powered HR Recruitment Automator

An enterprise-grade automation workflow built with **n8n**, **Google Gemini AI**, and **Notion** to streamline the talent acquisition process. This system transforms raw CV uploads into a structured hiring pipeline with zero manual intervention.

---

## 📋 Table of Contents
* [Overview](#overview)
* [System Architecture](#system-architecture)
* [Key Features](#key-features)
* [Technical Challenges & Solutions](#technical-challenges--solutions)
* [Setup & Installation](#setup--installation)

---

## 🔍 Overview
This project automates the entire screening phase. It monitors a **Google Drive** folder for new CVs, uses **Gemini AI** to extract data and score candidates, logs everything into **Notion**, and triggers personalized **Gmail** communications based on the evaluation.

## 🏗️ System Architecture
The workflow follows a 4-stage pipeline:
1. **Trigger Stage:** Google Drive node detects new PDF/Docx uploads.
2. **Processing Stage:** Files are converted to text and sent to Gemini AI for analysis.
3. **Parsing Stage:** A custom JavaScript node sanitizes the AI response and converts it into a valid JSON object.
4. **Action Stage:** Data is synced to Notion, and if a candidate is marked for an "Interview", an automated email is sent via Gmail.

## ✨ Key Features
* **Automated Scoring:** Candidates are scored from 1-10 based on custom-defined HR criteria.
* **Intelligent Parsing:** Custom Regex and JavaScript logic to handle inconsistent AI Markdown outputs.
* **Centralized Dashboard:** A Notion database acts as the single source of truth for all applicants.
* **Dynamic Communication:** Automated acceptance and rejection emails tailored with candidate names and scores.

## 🛠️ Technical Challenges & Solutions
### 1. Handling Undefined AI Responses
* **Issue:** The AI output path sometimes varied (e.g., `message.content` vs `content.parts`), leading to "Cannot read property of undefined" errors.
* **Solution:** Implemented **Optional Chaining (`?.`)** and multiple path validation in JavaScript to ensure the system never crashes on empty inputs.

### 2. JSON Sanitation
* **Issue:** Gemini often wrapped JSON in Markdown code blocks (```json ... ```), which native nodes couldn't parse.
* **Solution:** Developed a cleaning script to strip Markdown tags and extract pure JSON objects using `.replace()` and `.trim()`.

## 🚀 Setup & Installation
1. **Prerequisites:** n8n installed (Cloud or Desktop), Google Cloud Console (Gemini & Gmail APIs), and a Notion Integration.
2. **Import Workflow:** Download the `workflow.json` from this repo and import it into your n8n workspace.
3. **Configure Credentials:** Add your API keys for Google Drive, Gemini, Notion, and Gmail.
4. **Notion Setup:** Create a database with columns: `Name`, `Email`, `Matching Score`, `AI Analysis`, and `Status`.

---

**Developed with ❤️ by Taha Esmail Abdulsattar**
