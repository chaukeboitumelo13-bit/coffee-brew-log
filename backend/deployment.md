# Deployment

## Status
Not deployed to a live host. The app was fully built and tested locally (see Documentation.md for setup and testing details) but deployment itself was not attempted due to time constraints.

## Plan for deployment (Render.com)

**Backend:**
1. Push repo to GitHub (done)
2. Create a new Web Service on Render, connect to this repo, root directory `backend`
3. Set environment variable `DATABASE_URL` to a Render-provisioned PostgreSQL instance (SQLite doesn't persist on Render's ephemeral filesystem, so the schema would need to switch from `sqlite` to `postgresql` in `schema.prisma` for production)
4. Build command: `npm install && npx prisma generate && npx prisma migrate deploy`
5. Start command: `node server.js`

**Frontend:**
1. Create a new Static Site on Render, root directory `frontend`
2. Build command: `npm install && npm run build`
3. Publish directory: `dist`
4. Set environment variable `VITE_API_URL` to the deployed backend's URL (e.g. `https://coffee-brew-log-api.onrender.com/api/brews`)

## Known blocker
Switching from SQLite to PostgreSQL for production requires a schema and migration change that wasn't completed in the time available — this is the main remaining step before deployment can be attempted.