FindHere — Project Structure
=============================

This document summarizes the repository layout and the primary responsibilities of each folder/file.

Top-level
- `backend/`: Express + MongoDB API server (Node, ES modules)
- `client/`: React frontend (Vite)

Backend (backend/)
- `index.js`: App entry. Configures middleware, routes and starts server.
- `meiliSearch.js`: Meilisearch client configuration.
- `package.json`: Backend dependencies and scripts.
- `config/`:
  - `db.js`: MongoDB connection helper (reads `process.env.MONGO_URI`).
  - `cloudinary.js`: Cloudinary + Multer storage configuration.
- `controllers/`:
  - `authController.js`: Register / login / OTP / password flows.
  - `otpController.js`: OTP generation, send and verification.
  - `listingController.js`: Create, update, delete, list listings and Meilisearch upserts.
  - `searchController.js`: Sync and search listings with Meilisearch.
  - `reviewController.js`: Reviews CRUD.
- `models/`:
  - `User.js`, `Listing.js`, `Reviews.js`: Mongoose schemas and models.
- `routes/`: Route definitions mapping endpoints to controllers.
- `middlewares/`: `identification.js` (JWT cookie protect), `validator.js` (Joi schemas + HMAC helper).

Client (client/)
- `package.json`: Frontend dependencies (React, Vite, Tailwind, MUI etc.).
- `src/main.jsx`: App bootstrap, `AuthProvider` and `BrowserRouter`.
- `src/App.jsx`: Routes + global layout (Navbar, Toast container).
- `src/components/`, `src/pages/`: UI components, pages and forms (Add Listing, Dashboard, Details, Auth flows).
- `context/`: `AuthContext`, `SelectedPlaceContext`.

High-level flows
- Authentication: `authController` creates users and uses `otpController.sendOtp` for verification. JWT stored in an `httpOnly` cookie.
- Listings: `listingController` persists to MongoDB and indexes into Meilisearch.
- Search: `searchController` queries Meilisearch with optional filters and can sync DB -> Meilisearch.

Next: see `analysis.md` for detailed findings and recommended fixes.
