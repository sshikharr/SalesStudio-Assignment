# Round-Robin Coupon Distribution

## Setup Instructions
1. **Backend**
   - Clone repo and navigate to `server/`
   - Install dependencies: `npm install`
   - Set `MONGO_URI` in `.env`
   - Seed coupons: `node seed.js`
   - Start server: `npm start`

2. **Frontend**
   - Navigate to `client/`
   - Install dependencies: `npm install`
   - Start dev server: `npm start`

## Abuse Prevention Strategies
- **IP Tracking**: Uses `express-rate-limit` to restrict claims per IP to once per hour.
- **Cookie Tracking**: Sets a unique cookie to track browser sessions, preventing multiple claims.
- **Database Check**: Stores claim history in MongoDB to enforce restrictions across sessions.

## Live URL
- Backend: 
- Frontend: 