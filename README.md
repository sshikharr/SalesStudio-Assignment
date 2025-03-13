# Round-Robin Coupon Distribution

## Setup Instructions
1. **Backend**
   - Clone repo and navigate to `backend/`
   - Install dependencies: `npm install`
   - Set `MONGO_URI` and `CLIENT_URL` in `.env`
   - Seed coupons: `node seed.js`
   - Start the dev server: `npm run dev`

2. **Frontend**
   - Navigate to `frontend/`
   - Install dependencies: `npm install`
   - Start dev server: `npm run dev`

3. **Environment**
   - The environment variables are provided in a file called `.env.example` in both frontend and backend.

## Abuse Prevention Strategies
- **IP Tracking**: Uses `express-rate-limit` to restrict claims per IP to once per hour.
- **Cookie Tracking**: Sets a unique cookie to track browser sessions, preventing multiple claims.
- **Database Check**: Stores claim history in MongoDB to enforce restrictions across sessions.

## Live URL
- Backend: `https://salesstudio-assignment.onrender.com`
- Frontend: `https://sales-studio-assignment.vercel.app`