# Node TS Backend

A RESTful API backend built with **Node.js**, **TypeScript**, **Express**, and **MongoDB (Mongoose)**. It provides JWT-based authentication, session-protected routes, CRUD operations for resources such as items and blogs, and file upload handling via Multer.

## Features

- **Authentication** — user registration and login with hashed passwords (`bcryptjs`) and JSON Web Tokens (`jsonwebtoken`).
- **Session middleware** — protects routes by validating the `Authorization: Bearer <token>` header and attaching the authenticated user to the request.
- **Dynamic route loading** — route modules under `src/routes` are auto-discovered and mounted at startup, so adding a new `*.route.ts` file automatically registers it under `/api/<name>`.
- **Items CRUD** — full create/read/update/delete API for an "items" (car) resource.
- **Blogs endpoints** — scaffolded CRUD routes for a blogs resource.
- **Orders** — example of a session-protected endpoint.
- **File uploads** — authenticated file upload endpoint backed by Multer, with uploaded files persisted under `storage/` and metadata saved to MongoDB.
- **MongoDB integration** via Mongoose, with schemas for users, items, and uploads.

## Tech Stack

| Purpose        | Library         |
|----------------|-----------------|
| Language       | TypeScript      |
| HTTP framework | Express         |
| Database / ODM | MongoDB, Mongoose |
| Auth           | jsonwebtoken, bcryptjs |
| File uploads   | Multer          |
| CORS           | cors            |
| Env config     | dotenv          |
| Dev reload     | nodemon, ts-node |

## Project Structure

```
src/
├── app.ts                     # App entry point (Express setup, DB connection, server bootstrap)
├── config/
│   └── mongo.ts                # MongoDB connection setup
├── controllers/                # Request handlers (auth, blogs, items, orders, uploads)
├── interfaces/                 # Shared TypeScript types/interfaces
├── middlewares/                # Express middlewares (session/JWT guard, Multer, logging)
├── models/                     # Mongoose schemas/models (users, items, uploads)
├── routes/                     # Route definitions, auto-loaded by src/routes/index.ts
├── services/                   # Business logic / data access layer
└── utils/                      # Helpers (JWT signing/verification, password hashing, error handling)
storage/                        # Uploaded files are stored here (gitignored)
```

## Prerequisites

- Node.js (LTS recommended)
- A running MongoDB instance (local or a hosted cluster, e.g. MongoDB Atlas)

## Getting Started

1. **Clone the repository and install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   Copy `.env.example` to `.env` and fill in the values:

   ```bash
   cp .env.example .env
   ```

   | Variable     | Description                                  |
   |--------------|-----------------------------------------------|
   | `PORT`       | Port the HTTP server listens on (e.g. `3001`) |
   | `DB_URI`     | MongoDB connection string                     |
   | `JWT_SECRET` | Secret key used to sign and verify JWTs       |

3. **Run in development mode** (auto-reloads on file changes via `nodemon`)

   ```bash
   npm run dev
   ```

4. **Build and run in production**

   ```bash
   npm run build
   npm start
   ```

   `npm run build` compiles TypeScript to `dist/`, and `npm start` runs the compiled output.

## API Reference

All routes are mounted under the `/api` prefix.

### Auth — `/api/auth`

| Method | Endpoint    | Description         | Auth required |
|--------|-------------|----------------------|----------------|
| POST   | `/register` | Register a new user  | No             |
| POST   | `/login`    | Log in and receive a JWT | No         |

**Register/Login request body**

```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

> Note: registering a user requires `name` and `email`/`password` (see `User`/`Auth` interfaces). The login response includes a `token` to be used as a Bearer token on protected routes.

### Items — `/api/items`

| Method | Endpoint | Description        | Auth required |
|--------|----------|---------------------|----------------|
| GET    | `/`      | List all items       | No             |
| GET    | `/:id`   | Get a single item    | No             |
| POST   | `/`      | Create a new item     | No             |
| PUT    | `/:id`   | Update an item        | No             |
| DELETE | `/:id`   | Delete an item        | No             |

**Item body shape**

```json
{
  "name": "string",
  "color": "string",
  "gas": "gasoline | electric",
  "year": 2023,
  "description": "string",
  "price": 10000
}
```

### Blogs — `/api/blogs`

| Method | Endpoint | Description         |
|--------|----------|-----------------------|
| GET    | `/`      | List all blogs         |
| GET    | `/:id`   | Get a single blog       |
| POST   | `/`      | Create a blog           |
| PUT    | `/:id`   | Update a blog           |
| DELETE | `/:id`   | Delete a blog           |

> This resource is currently scaffolded with placeholder responses (no persistence layer yet).

### Orders — `/api/orders`

| Method | Endpoint | Description                     | Auth required |
|--------|----------|----------------------------------|----------------|
| GET    | `/`      | Returns data for the logged-in user | Yes — JWT     |

### Uploads — `/api/uploads`

| Method | Endpoint | Description                          | Auth required |
|--------|----------|----------------------------------------|----------------|
| POST   | `/`      | Upload a file (multipart field `myFile`) | Yes — JWT     |

Uploaded files are stored on disk under `storage/`, and metadata (`fileName`, `path`, `email`) is persisted to MongoDB.

### Authentication for protected routes

Protected routes require a valid JWT sent in the `Authorization` header:

```
Authorization: Bearer <token>
```

The token is obtained from the `/api/auth/login` response and is valid for 2 hours.

## Scripts

| Script          | Description                                  |
|-----------------|-----------------------------------------------|
| `npm run dev`   | Start the server in watch mode with `nodemon` |
| `npm run build` | Compile TypeScript to the `dist/` folder      |
| `npm start`     | Run the compiled app from `dist/`             |

## License

ISC
