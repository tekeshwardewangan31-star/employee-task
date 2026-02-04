# Employee Management System

A full-stack application for managing employees and tasks with role-based access control.

## Tech Stack
- **Backend:** Node.js, Express, MongoDB (Mongoose), Joi, JWT
- **Frontend:** React, Vite, Ant Design, Axios, Formik

## Setup Instructions

### Backend
1. Navigate to `Backend/`
2. Install dependencies: `npm install`
3. Create `.env` file based on `.env.example`
4. Start the server: `npm start` (Runs on http://localhost:5000)

### Frontend
1. Navigate to `Frontend/`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev` (Runs on http://localhost:5173)

## API Flow

### Authentication
- `POST /auth/login`: Authenticate user and receive JWT.

### User Management (Manager Only)
- `POST /users`: Create a new user.
- `GET /users`: List all users.

### Task Management
- `POST /tasks`: (Manager Only) Assign a task to an employee.
- `GET /tasks`: 
  - Managers see ALL tasks.
  - Employees see ONLY tasks assigned to them.
- `PATCH /tasks/:id/status`: (Employee Only) Update the status of an assigned task.

## Role Handling
- **Manager:** Full access to user creation and task assignment. Can oversee all activities.
- **Employee:** restricted access. Can only view and update their own assigned tasks.

## Seeder Command
1. Create Manager: `npm run seed`

## testing Credentials
email : manager@gmail.com
password : Test@123