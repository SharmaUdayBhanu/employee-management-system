# Employee Management System

> A full-stack web application for managing employees and their tasks, featuring admin and employee dashboards, real-time task updates, and a modern responsive UI.

---

## Features

- Admin and Employee authentication
- Assign, update, and track tasks for employees
- Real-time task status updates (new, active, completed, failed)
- Responsive UI with dark/light mode
- RESTful API with Express and MongoDB
- Deployed on Render (frontend and backend)

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Axios
- **Backend:** Node.js, Express, MongoDB (Atlas), Mongoose

## Folder Structure

```
├── backend/           # Express server, API, MongoDB models
│   └── dist/          # Frontend build output (served by Express)
├── client/            # React source code
│   └── src/
├── .env               # Environment variables (not committed)
├── package.json       # Project scripts and dependencies
```

## Setup & Development

1. **Clone the repository:**

   ```sh
   git clone https://github.com/SharmaUdayBhanu/employee-management-system.git
   cd employee-management-system
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**

   - Create a `.env` file in the root and add:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com
     MONGODB_URI=your-mongodb-atlas-uri
     ```

4. **Build frontend and start backend:**
   ```sh
   npm run build
   npm start
   ```
   The backend will serve the frontend from `backend/dist`.

## Deployment

- Deploy backend and frontend (with build output in `backend/dist`) to [Render](https://render.com).
- Set environment variables (`MONGODB_URI`, `VITE_API_URL`) in the Render dashboard.

## Usage

- Admin can log in, view all employees, assign and manage tasks.
- Employees can log in, view and update their tasks.
- All data is stored in MongoDB Atlas.

## Notes

- If the database is empty, add initial employees/admins via a seed script or directly in MongoDB Atlas.
- All API endpoints are prefixed with `/api` (e.g., `/api/employees`).

---

**Author:** SharmaUdayBhanu
