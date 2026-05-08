<a name="readme-top"></a>

<div align="center">
  <h1 align="center">FindHere</h1>
  <p align="center">
    A comprehensive location discovery and listing platform.
    <br />
    <a href="#key-features"><strong>Explore the features »</strong></a>
    <br />
    <br />
    <a href="https://find-here.vercel.app">View Live Deployment</a>
    ·
    <a href="https://github.com/suleman-badar/FindHere/issues">Report Bug</a>
    ·
    <a href="https://github.com/suleman-badar/FindHere/issues">Request Feature</a>
  </p>
</div>


## About The Project

**FindHere** is a modern, full-stack web application designed to seamlessly discover, list, and review locations. Built with performance and user experience in mind, it features a robust search engine, interactive mapping and routing capabilities, and a highly responsive user interface.

 **Live App:** [https://find-here.vercel.app](https://find-here.vercel.app)

## Key Features

-  **Interactive Maps & Routing:** Powered by Leaflet and Google Maps API for seamless location tracking and navigation.
-  **Blazing Fast Search:** Integrated with Meilisearch for typo-tolerant, lightning-fast search experiences.
-  **Secure Authentication:** Multi-provider authentication supporting Email/Password, Google, and Apple Sign-In.
-  **Media Management:** Cloudinary integration for robust and optimized image handling.
-  **Reviews & Ratings:** Comprehensive review system for community-driven insights.
-  **Modern UI/UX:** Built with React, TailwindCSS, and Framer Motion for beautiful micro-animations and responsive design.

## Tech Stack

### Frontend (Client)
- **Framework:** React 18 (Vite)
- **Styling:** Tailwind CSS, Emotion
- **State Management & Fetching:** TanStack React Query, Axios
- **Routing:** React Router v7
- **Maps:** Leaflet, React Leaflet, Google Maps API
- **Animations:** Framer Motion
- **Forms & Validation:** React Hook Form, Yup

### Backend (Server)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Search Engine:** Meilisearch
- **Storage:** Cloudinary (via Multer)
- **Security:** Helmet, Express Rate Limit, JWT, Bcrypt.js
- **Emails/OTP:** Nodemailer, OTP Generator

## Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

Ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)
- [Meilisearch](https://www.meilisearch.com/) instance


### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/suleman-badar/FindHere.git
   cd FindHere
   ```

2. **Install Backend Dependencies & Run Server**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Install Client Dependencies & Run Frontend**
   Open a new terminal window/tab:
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Seed the Database (Optional)**
   If you want to populate your database with dummy data:
   ```bash
   cd backend
   npm run seed
   ```

The application should now be running. The frontend will be accessible at `http://localhost:5173` (or the port Vite assigns), and the backend API at `http://localhost:7700`.

## Project Structure

```text
FindHere/
├── backend/                # Node.js/Express API
│   ├── config/             # Database and service configurations
│   ├── controllers/        # Route controllers (Auth, Listings, Reviews, Search)
│   ├── middlewares/        # Custom Express middlewares (Auth, Uploads, Error Handling)
│   ├── models/             # Mongoose database schemas
│   ├── routes/             # API route definitions
│   ├── index.js            # Entry point for the backend server
│   └── dockerfile          # Docker configuration for backend
└── client/                 # React frontend application
    ├── public/             # Static assets
    ├── src/                # Source code (Components, Pages, Hooks, Utils)
    ├── figma/              # Design assets/exports
    ├── tailwind.config.js  # TailwindCSS configuration
    └── vite.config.js      # Vite configuration
```
