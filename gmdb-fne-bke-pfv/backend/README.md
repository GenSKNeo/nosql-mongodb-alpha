# Profiles Viewer (Node + Express + MongoDB)

## What it is
A simple Profiles Viewer app that demonstrates CRUD operations with MongoDB using Mongoose.
Includes a Home page listing learning modules for Non-relational Databases & MongoDB.

## Setup
1. Clone or copy project files.
2. `cd profiles-viewer`
3. `npm install`
4. Copy `.env.example` to `.env` and set:

MONGODB_URI=mongodb+srv://<user>:<password>@.../ProfilesDB
PORT=3000

5. Start the app:
- Development (auto-restart): `npm run dev`
- Production: `npm start`
6. Open `http://localhost:3000` in your browser. Click **Open Profiles** to manage users.

## API Endpoints
- `GET /api/users` - list users
- `GET /api/users/:id` - get user
- `POST /api/users` - create user
- `PUT /api/users/:id` - update user
- `DELETE /api/users/:id` - delete user

