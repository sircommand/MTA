
# IranMTA-style Next.js + Prisma (SQLite) + JWT Auth

## Quickstart (local)
1. Install:
   ```bash
   npm install
   ```
2. Generate Prisma client and run migration:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
3. Run dev:
   ```bash
   npm run dev
   ```

## Notes
- Uses SQLite (file: prisma/dev.db).
- Auth implemented with JWT stored in HttpOnly cookie (`token`).
- API routes: `/api/auth/register`, `/api/auth/login`, `/api/auth/logout`, `/api/auth/me`
  and `/api/servers`.
- Servers API supports query params for search & filters:
  `GET /api/servers?search=drift&mode=Drift&sort=players_desc`
