FindHere — Codebase Analysis & Findings
=======================================

This file highlights functional bugs, security concerns, and maintainability issues found during a quick review, plus recommended fixes and priority levels.

Critical / High priority
- Inconsistent model references (possible bug):
  - `backend/models/Listing.js` registers the model as `mongoose.model("listing", ...)` (lowercase "listing").
  - `backend/models/Reviews.js` references `listingId: { type: Schema.Types.ObjectId, ref: "Listing" }` (capitalized "Listing").
  - Risk: Mongoose population or lookups may fail. Recommendation: standardize model names (use `Listing` or `listing`) and update refs.

- `backend/models/Listing.js` — `images` default value is a string:
  - `images: { type: [String], default: "", }` should be `default: []`.
  - Risk: saving and reading images may behave inconsistently and lead to runtime errors.

Major / Security
- Meilisearch configuration:
  - `backend/meiliSearch.js` uses an unauthenticated host `http://localhost:7700` and no `apiKey` comment for production.
  - Recommendation: require and read `MEILI_MASTER_KEY` (or similar) from env; use HTTPS in prod; restrict indexing endpoints.

- Email credentials and nodemailer usage:
  - Multiple files create Gmail transports using `process.env.EMAIL_USER` and `process.env.EMAIL_PASS`. Ensure secrets are not committed and use App Passwords / OAuth.
  - Recommendation: document env vars required in `.env.example` and rotate credentials if they were leaked.

- CORS origin hard-coded in `backend/index.js`:
  - `origin: "http://localhost:5173"` restricts to local dev only and may be forgotten in staging/prod.
  - Recommendation: make `CORS_ORIGIN` configurable via env and allow a filtered list in production.

Functional / Correctness
- Meilisearch document id inconsistency:
  - `listingController` indexes documents with `id: saved._id.toString()`.
  - `searchController.syncResturants` maps docs with `_id: doc._id.toString()` and creates index with primaryKey `_id`.
  - Recommendation: pick one primary key naming (`_id` or `id`) and use it consistently.

- `backend/controllers/searchController.js` import paths are inconsistent with other controllers (uses `../../backend/meiliSearch.js`).
  - Not strictly broken here, but normalize to a simple `../meiliSearch.js` from controllers to avoid fragile paths.

- Joi email validation is restrictive:
  - `acceptFPCodeSchema` limits TLDs to `com` and `net` — this will reject many valid addresses. Loosen validation.

Medium / Maintainability
- Enums in `Listing.js` are strict (cuisine, services, tags, etc.).
  - This can block valid / future values from being stored. Either expand enums or remove them and validate at the app layer.

- Some dependencies are present but not used (e.g., `express-rate-limit` is in `package.json` but not applied). Add rate limiting around auth endpoints.

- Error handling and logging:
  - Controllers often `res.status(500).json({ message: e.message })` but no centralized error middleware. Add an express error handler and standardized error responses.

Low / Suggestions
- Move the `app.use((_req, res) => res.status(404)... )` 404 handler before `app.listen()` (stylistic).
- Add validation on the frontend and backend for all listing fields (enforce length, types, value sets) to avoid Mongoose save errors.
- Add tests for auth flows (register, verify OTP, login, forgot password) and for listing creation/update flows.

Quick fixes (ordered)
1. Fix `images` default in `backend/models/Listing.js` to `default: []` (high).
2. Standardize model names / refs: change `Reviews.js` ref to `listing` or Listing model name to `Listing` (high).
3. Make Meilisearch primary key naming consistent (`_id` vs `id`) and update indexing code (high/medium).
4. Add `.env.example` listing required env vars: `MONGO_URI`, `JWT_SECRET`, `EMAIL_USER`, `EMAIL_PASS`, `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET`, `MEILI_HOST`, `MEILI_API_KEY` (medium).
5. Replace hard-coded CORS origin with `process.env.CORS_ORIGIN` (medium).
6. Add rate limiting to auth routes using `express-rate-limit` (medium).

Next steps I can take for you
- Apply the quick fixes as PRs (I can patch the files now).
- Add an `.env.example` and a `README.md` section documenting local dev setup and required env vars.
- Add basic unit / integration tests for the auth and listing flows.

If you'd like, I can start by applying items 1–3 automatically. Tell me which fixes to apply first.
