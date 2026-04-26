# Environment Variables Setup Guide for FindHere

This document outlines all environment variables used in the FindHere application and where to configure them.

---

## Backend Environment Variables

Create a `.env` file in the `backend/` folder with the following variables:

### Database
- **`MONGO_URI`**
  - **Used in:** `backend/config/db.js`
  - **Current Value:** Hardcoded as `"mongodb://127.0.0.1:27017/myapp"`
  - **Required:** Yes
  - **Example:** `MONGO_URI=mongodb://127.0.0.1:27017/myapp`
  - **Note:** For production, use MongoDB Atlas or a remote MongoDB instance

### Server Configuration
- **`PORT`**
  - **Used in:** `backend/index.js`
  - **Current Value:** Falls back to `8000` if not set
  - **Required:** No (defaults to 8000)
  - **Example:** `PORT=8000`
  - **Note:** The frontend is hardcoded to use `http://localhost:8000`

- **`NODE_ENV`**
  - **Used in:** `backend/controllers/authController.js` (for cookie secure flag)
  - **Current Value:** Not explicitly set
  - **Required:** No
  - **Example Values:** `development` or `production`
  - **Recommended:** Set to `development` for local testing

### Authentication & Security
- **`JWT_SECRET`**
  - **Used in:** `backend/middlewares/identification.js`, `backend/controllers/authController.js`
  - **Purpose:** Secret key for JWT token generation and verification
  - **Required:** Yes
  - **Example:** `JWT_SECRET=your_super_secret_jwt_key_12345`
  - **Note:** Use a strong, random string for production

- **`HMAC_VERIFICATION_CODE_SECRET`**
  - **Used in:** `backend/controllers/authController.js`
  - **Purpose:** Secret key for HMAC-based verification code hashing
  - **Required:** Yes
  - **Example:** `HMAC_VERIFICATION_CODE_SECRET=your_hmac_secret_key_67890`
  - **Note:** Use a strong, random string for production

### Email Configuration
- **`EMAIL_USER`**
  - **Used in:** `backend/controllers/authController.js`, `backend/controllers/otpController.js`
  - **Purpose:** Gmail email address for sending OTP and password reset emails
  - **Required:** Yes
  - **Example:** `EMAIL_USER=your-email@gmail.com`
  - **Note:** Use a Gmail account with App Password enabled

- **`EMAIL_PASS`**
  - **Used in:** `backend/controllers/authController.js`, `backend/controllers/otpController.js`
  - **Purpose:** Gmail App Password (not your regular password)
  - **Required:** Yes
  - **Example:** `EMAIL_PASS=your_app_password_16_chars`
  - **How to Generate:** 
    1. Go to [Google Account Security](https://myaccount.google.com/security)
    2. Enable 2-Factor Authentication
    3. Generate an App Password for Mail
    4. Use this 16-character password

### Cloudinary Configuration (Image Upload)
- **`CLOUD_NAME`**
  - **Used in:** `backend/config/cloudinary.js`
  - **Purpose:** Your Cloudinary account name
  - **Required:** Yes
  - **Example:** `CLOUD_NAME=your_cloud_name`
  - **How to Get:** Sign up at [Cloudinary](https://cloudinary.com)

- **`CLOUD_API_KEY`**
  - **Used in:** `backend/config/cloudinary.js`
  - **Purpose:** Cloudinary API key
  - **Required:** Yes
  - **Example:** `CLOUD_API_KEY=123456789012345`
  - **How to Get:** From Cloudinary dashboard > Settings > API Keys

- **`CLOUD_API_SECRET`**
  - **Used in:** `backend/config/cloudinary.js`
  - **Purpose:** Cloudinary API secret (sensitive)
  - **Required:** Yes
  - **Example:** `CLOUD_API_SECRET=your_cloud_api_secret_key`
  - **How to Get:** From Cloudinary dashboard > Settings > API Keys
  - **⚠️ Important:** Never expose this in production. Store securely.

---

## Frontend Environment Variables

Currently, the frontend uses **hardcoded API endpoints** pointing to `http://localhost:8000`.

### To Configure for Production:

The following files contain hardcoded backend URLs and should be updated:

**Files with hardcoded URLs:**
- `client/src/context/AuthContext.jsx`
- `client/src/Hooks/useDetails.jsx`
- `client/src/components/AddListingForm/AddListingForm.jsx`
- `client/src/pages/SignUp.jsx`
- `client/src/pages/SignIn.jsx`
- `client/src/components/Dashboard/SidebarAdmin.jsx`
- `client/src/pages/ReviewForm.jsx`
- `client/src/components/Home/Featured.jsx`
- `client/src/pages/Dashboard.jsx`
- `client/src/components/Home/Search.jsx`
- And multiple other component files

### Recommendation:

Create a `.env` file in the `client/` folder (or use Vite's `.env.*` files):

```
VITE_API_BASE_URL=http://localhost:8000
```

Then update all API calls to use:
```javascript
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
```

---

## Quick Setup Instructions

### Step 1: Create Backend `.env`
```bash
cd backend
touch .env
```

Add the following (replace with your actual values):
```env
# Database
MONGO_URI=mongodb://127.0.0.1:27017/myapp

# Server
PORT=8000
NODE_ENV=development

# JWT & Security
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
HMAC_VERIFICATION_CODE_SECRET=your_hmac_secret_change_this_in_production

# Email (Gmail with App Password)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your_app_password_from_google

# Cloudinary (Image Upload)
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

### Step 2: Verify MongoDB Connection
```bash
# Ensure MongoDB is running locally (or use MongoDB Atlas)
# Local: mongodb://127.0.0.1:27017/myapp
# Cloud: mongodb+srv://username:password@cluster.mongodb.net/myapp
```

### Step 3: Start Backend
```bash
cd backend
npm install
npm run dev
```

### Step 4: Start Frontend
```bash
cd ../client
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

### Step 5: Test the App
- Open `http://localhost:5173` in your browser
- The app should connect to backend on `http://localhost:8000`

---

## Environment Summary Table

| Variable | Backend | Frontend | Required | Type |
|----------|---------|----------|----------|------|
| MONGO_URI | ✅ | - | Yes | URL |
| PORT | ✅ | - | No | Number |
| NODE_ENV | ✅ | - | No | String |
| JWT_SECRET | ✅ | - | Yes | String |
| HMAC_VERIFICATION_CODE_SECRET | ✅ | - | Yes | String |
| EMAIL_USER | ✅ | - | Yes | String |
| EMAIL_PASS | ✅ | - | Yes | String |
| CLOUD_NAME | ✅ | - | Yes | String |
| CLOUD_API_KEY | ✅ | - | Yes | String |
| CLOUD_API_SECRET | ✅ | - | Yes | String |
| VITE_API_BASE_URL | - | ❌ (hardcoded) | No* | URL |

---

## Security Notes

⚠️ **Important:**
1. **Never commit `.env` files** to Git
2. Add `.env` to `.gitignore` in both `backend/` and `client/` folders
3. Use strong, random values for `JWT_SECRET` and `HMAC_VERIFICATION_CODE_SECRET`
4. Rotate API keys regularly in production
5. Use MongoDB Atlas or similar managed service for production
6. Never expose `CLOUD_API_SECRET` in client-side code

---

## Troubleshooting

**Issue:** "MONGO_URI connection failed"
- Solution: Ensure MongoDB is running locally or update MONGO_URI to a valid remote connection

**Issue:** "JWT verification failed"
- Solution: Ensure JWT_SECRET matches between token creation and verification

**Issue:** "Email not sending"
- Solution: Verify EMAIL_USER and EMAIL_PASS are correct; check Gmail App Passwords setup

**Issue:** "Image upload fails"
- Solution: Verify Cloudinary credentials in all three env vars; check Cloudinary dashboard
