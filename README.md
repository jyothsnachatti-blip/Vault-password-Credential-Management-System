# SecureVault — Login & Registration Starter

Milestone 1 scaffold: Spring Boot backend + React frontend with working
Register and Login, JWT issuing, and BCrypt password hashing.

## 1. Backend setup

**Prerequisites:** JDK 17+, PostgreSQL running locally.

1. Create the database:
   ```sql
   CREATE DATABASE securevault_db;
   ```
2. Open `backend/` in IntelliJ IDEA (it will detect the Maven project and
   download dependencies automatically).
3. Edit `src/main/resources/application.properties` if your PostgreSQL
   username/password aren't `postgres` / `postgres`.
4. Run `SecurevaultApplication.java`. Hibernate will auto-create the `users`
   table on first run (`ddl-auto=update`).
5. Backend runs on **http://localhost:8080**.

### Test it with curl (or Postman)

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Ada Lovelace","email":"ada@example.com","password":"strongpass123"}'

curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ada@example.com","password":"strongpass123"}'
```

Both should return a JSON body with a `token`.

## 2. Frontend setup

**Prerequisites:** Node.js LTS.

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on **http://localhost:5173** (Vite's default). CORS in the
backend is already configured to allow requests from this origin.

Visit `http://localhost:5173/register` to create an account, then
`http://localhost:5173/login` to log in. On successful login it tries to
navigate to `/dashboard` — that page doesn't exist yet, so add a route for
it (or just watch the network tab / localStorage token for now).

## 3. What's deliberately NOT included yet

This is scoped to *just* Login + Registration, per Milestone 1. Everything
below belongs to later weeks — don't add it yet:

- MFA / TOTP / OAuth2
- Redis session/token caching
- Encryption of vault data (AES-256)
- Security monitoring, audit logging, WebSocket alerts
- Docker, CI/CD, cloud deployment

## 4. Known things to fix before this is "real"

- `jwt.secret` in `application.properties` is a placeholder — replace it
  with a real random secret (and move it out of source control) before
  this touches anything beyond your laptop.
- The JWT is stored in `localStorage` on the frontend for simplicity.
  That's fine to learn with, but it's vulnerable to XSS — an httpOnly
  cookie is the safer pattern once you get further into the security
  modules.
- There's no `/dashboard` page yet — that's your next logical step once
  login works end-to-end.
