# Science Interactive AI 🔬

A modern, AI-powered interactive educational application built specifically to perfectly align with the **Singapore Ministry of Education (MOE) Upper Primary Science Syllabus**. 

This application dynamically tracks student proficiency across core scientific themes and utilizes live Large Language Models (LLMs) to generate personalized adaptive worksheets and instantly grade open-ended answers.

## ✨ Features

- **Interactive Mastery Dashboard**: Visualizes student learning progress using dynamic percentage wheels across the 5 core MOE Themes: Diversity, Cycles, Systems, Energy, and Interactions. AI identifies specific "Focus Areas" where a student needs the most improvement.
- **Adaptive AI Worksheet Generator**: Leverages the OpenRouter API to construct custom practice paths on the fly. Explicitly select your target Grade Level (Primary 4, 5, or 6) and desired question length to pull finely-tuned difficulty questions.
- **Mixed Content Assessments**: Seamlessly generates and transitions between:
  - **Multiple Choice Questions (MCQ)** for fast, targeted concept recall.
  - **Open-Ended Questions (OEQ)** where students must type detailed explanations. The AI strictly evaluates these typed explanations against an internal grading rubric.
- **Premium Glassmorphism UI**: High-quality visual aesthetics utilizing translucent layering, clean typography, active hover effects, and built-in CSS micro-animations.

## 🛠 Tech Stack

- **Frontend Ecosystem**: [React 18](https://react.dev/) bundled with ultra-fast [Vite](https://vitejs.dev/)
- **Styling**: Robust Vanilla CSS design system via variables and flexbox
- **State Management**: React Context (`ProgressContext`)
- **Iconography**: [Lucide React](https://lucide.dev/)
- **AI Integration**: Custom `aiService.js` utilizing the official OpenAI Node SDK connected to the [OpenRouter platform](https://openrouter.ai/).

## 🚀 Getting Started

### Prerequisites

You will need an active API Key from OpenRouter to power the dynamic question generation. 
Node.js must be installed on your local machine.

### Installation

1. Navigate to the project root:
   ```bash
   cd science-interactive
   ```

2. Install the necessary project dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables securely:
   - Create a file named **exactly** `.env.local` in the root directory.
   - Insert your API key exactly like this:
     ```env
     VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
     ```
   *(Note: The repository's configured `.gitignore` file automatically protects `.env.local` so your private key will never be pushed to your GitHub repository.)*

4. Start the Vite development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to the address shown in your terminal (usually `http://localhost:5173/`).

## 📚 Curriculum Alignment

This tool's internal data model uses a structured prompt to pull questions strictly from the MOE Singapore Upper Primary syllabus domains:

- **Diversity**: Classification of Living Things, Fungi, Bacteria, Exploring Materials
- **Cycles**: Life Cycles of Plants & Animals, Water Cycle, Reproduction
- **Systems**: Human Digestive/Respiratory/Circulatory Systems, Plant Transport, Cells, Electrical Systems
- **Energy**: Light Energy, Heat Energy, Energy Conversions
- **Interactions**: Magnets, Forces (Friction, Gravity, Elastic), Environmental impact, Food Chains / Food Webs
