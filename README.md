# Thorpebury in the Limes (TiTL)

Community web app for **Thorpebury in the Limes** — TiTL. React + TypeScript + Tailwind (Vite) frontend and Express backend in one repository. **MongoDB** (Mongoose) stores user accounts; **register and log in** use the API with bcrypt password hashes and an **HTTP-only cookie** holding a signed JWT.

## Requirements

- Node.js 20+ and npm (or pnpm/yarn with equivalent commands)
- MongoDB — [Atlas](https://www.mongodb.com/cloud/atlas) (recommended) or a local `mongod` instance
- [mongosh](https://www.mongodb.com/docs/mongodb-shell/) (optional) — MongoDB Shell to inspect data from the terminal

## Configuration

1. Copy `.env.example` to `.env` in the **repository root** (next to the root `package.json`).
2. Set `MONGODB_URI`, for example:
   - Atlas: `mongodb+srv://<user>:<password>@<cluster>/<dbname>?retryWrites=true&w=majority`
   - Local: `mongodb://127.0.0.1:27017/titl`
3. Set `JWT_SECRET` to a long random string (at least **16 characters**), for example:
   `openssl rand -base64 32`

If `MONGODB_URI` is empty or missing, the server still runs; `GET /api/health` reports `mongo.state` as `not_configured`. Auth endpoints return **503** until MongoDB is connected.

## Scripts

From the repository root:

| Command | Description |
|--------|-------------|
| `npm install` | Install root and workspace packages |
| `npm run dev` | Vite dev server (port 5173) + Express API (port 3001) |
| `npm run build` | Production build of client and server |
| `npm start` | Run Express; serves `client/dist` and `/api/*` |

During `npm run dev`, the Vite dev server proxies `/api/*` to Express so the SPA and API share one origin for cookies.

## Auth API

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/auth/me` | Current user from cookie, or **401** |
| `POST` | `/api/auth/register` | JSON `{ name, email, password }` — creates user, sets cookie |
| `POST` | `/api/auth/login` | JSON `{ email, password }` — sets cookie |
| `POST` | `/api/auth/logout` | Clears cookie |

## MongoDB Shell (`mongosh`)

Use the same connection string as `MONGODB_URI` (quote it in the shell if it contains `&`):

```bash
mongosh "$MONGODB_URI"
```

Then inspect registered users (passwords are hashed; only metadata is visible):

```javascript
use titl   // or your database name from the URI path
db.users.find({}, { email: 1, name: 1, createdAt: 1 }).pretty()
```

## Project layout

- `client/` — Vite React app (pages: home, developers, contacts, events, login, register)
- `server/` — Express, Mongoose (`server/src/db/mongo.ts`), auth routes (`server/src/routes/auth.ts`)

## Notes

- Developer copy is summarised from public sites (Davidsons, William Davis) plus a link for David Wilson Homes. Always confirm details on the official sales sites.
- Contacts and events use placeholder data so you can replace content with community-approved listings.
