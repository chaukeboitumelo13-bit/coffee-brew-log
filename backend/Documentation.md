# Coffee Brew Log

A full-stack app to log coffee brews, built for the XPL bootcamp assessment.

## Tech Stack
- Backend: Node.js + Express
- ORM: Prisma
- Database: SQLite
- Testing: Thunder Client (VS Code extension)

## Setup Instructions
1. Clone the repo
2. `cd backend`
3. `npm install`
4. `npx prisma generate`
5. `npx prisma migrate dev --name init`
6. `node server.js`
7. Server runs on http://localhost:3000

## API Endpoints
- `POST /api/brews` — create a brew
- `GET /api/brews` — list all brews (optional `?method=` filter)
- `PUT /api/brews/:id` — update a brew
- `DELETE /api/brews/:id` — delete a brew

## Status
Backend fully fuctional, all CRUD(CREATE, READ, UPDATE, DELETE) endpoints verified from start to finish. Frontend fully functional with React + Tailwind CSS, including brew logging form, ticket-style history view, method filtering, sort toggle, live stats summary, and inline delete confirmation. Full stack tested and working locally.