# CorpConnect 🏢✨

A modern, blazing-fast, enterprise-grade Intranet and Employee Engagement platform built with React, Vite, and Tailwind CSS.
CorpConnect reimagines the corporate intranet. Moving away from clunky, legacy portals, CorpConnect delivers a premium SaaS experience featuring glassmorphism design, smooth interactive animations, and a focus on social engagement and employee recognition.

## 🎯 Project Overview

CorpConnect serves as the digital headquarters for modern, distributed companies. It centralizes internal communications, employee directories, peer-to-peer recognition, and administrative controls into a single, highly responsive web application. 

The application is built mobile-first, ensuring that employees can stay connected whether they are at their desks or on the go.

## ✨ Key Features

- **Dashboard:** Personalized overview of company milestones, leadership announcements, and platform engagement analytics.
- **Social Feed (LinkedIn/Slack Inspired):** Share updates, create polls, and celebrate milestones with a rich, interactive feed featuring likes and comments.
- **Employee Directory:** A searchable, filterable grid of employee profiles with real-time online status and collaboration tags.
- **Recognition & Gamification:** Send "Kudos" and award badges to peers. Features a leveling system and a monthly champion leaderboard.
- **Knowledge Hub:** Central repository for company policies, FAQs, and IT/HR resources.
- **Admin Portal:** Comprehensive controls for HR and IT to monitor engagement, manage announcements, and moderate content.
- **Premium UI/UX:** Dark/Light mode support, fluid layout animations via Framer Motion, and a modern glassmorphism aesthetic.

---

## 🛠 Tech Stack

- **Framework:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing:** [React Router v6](https://reactrouter.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Data Visualization:** [Recharts](https://recharts.org/)

---

## 📸 Screenshots

*(Replace placeholder URLs with actual screenshots of your deployed application)*

| Dashboard | Social Feed |
| :---: | :---: |
| ![Dashboard](https://placehold.co/600x400/0f172a/4f46e5?text=Dashboard+View) | ![Feed](https://placehold.co/600x400/0f172a/4f46e5?text=Social+Feed) |
| **Directory** | **Recognition** |
| ![Directory](https://placehold.co/600x400/0f172a/4f46e5?text=Employee+Directory) | ![Recognition](https://placehold.co/600x400/0f172a/4f46e5?text=Recognition+Page) |

---

## 🏗 Architecture & Design System

CorpConnect is structured for scalability and maintainability:

- **Component-Driven:** UIs are broken down into reusable elements (cards, buttons, inputs) utilizing Tailwind's `@layer components` for consistency.
- **Layouts:** A persistent `MainLayout.jsx` handles the responsive sidebar, top navigation, and ambient background layers, while `react-router-dom` injects the page content via `<Outlet />`.
- **Styling Methodology:** Uses highly customized Tailwind configuration to implement a "Glassmorphism" design system. This relies on `backdrop-blur`, sophisticated RGBA backgrounds, and precise shadow layers to create depth.
- **Animation Strategy:** Framer Motion is used strategically to prevent jarring DOM updates. It handles staggered entrances, layout morphing (e.g., when filtering the directory), and micro-interactions (e.g., pulsing badges).

---

## 🚀 Installation & Setup

Follow these steps to run CorpConnect locally.

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Steps

1. **Clone the repository**
   
   git clone [ https://github.com/rajesh36sarkar/Corpconnect-intranet-portal.git ]

   Move to project folder - cd corpconnect
   Install dependencies - npm install
   Run the development server - npm run dev
   Build for production - npm run build


### 🌐 Deployment Links
Live Demo: https://corporate-intranet-portal.vercel.app 
Repository: https://github.com/rajesh36sarkar/Corpconnect-intranet-portal.git

### 🤖 AI Tools Used
This project was built with the assistance of advanced AI models to accelerate development, design the UI/UX architecture, and generate realistic mock data.

Google Gemini: Utilized for scaffolding the React component structure, generating the complex Tailwind CSS configurations (including the glassmorphism design system), and writing the initial responsive layout logic.

Data Generation: AI was used to populate mockData.js with realistic enterprise scenarios, employee profiles, and engagement metrics to simulate a live production environment.

Built for the modern workforce.