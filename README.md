# ✈️ TripVault

A secure MERN stack travel memory journal application.

TripVault is a full-stack web application built using the MERN stack. It allows users to create an account, securely log in, and manage their personal travel memories through a personalized dashboard.

## 🎯 Project Objective

The objective of TripVault is to provide users with a secure platform to manage their personal travel memories.

The Week 2 objective focuses on implementing complete **Trip Management and CRUD Operations** using Node.js, Express.js, MongoDB, and React.

The application allows authenticated users to:

- Create new trips
- View their personal trips
- View individual trip details
- Update existing trips
- Delete trips
- Manage trip information through a React-based dashboard
- Access only their own trip data through ownership validation

---

## 🚀 Features

### 🔐 Authentication

- User Registration
- Secure User Login
- Password Hashing using bcrypt
- JWT-based Authentication
- Protected User Route
- Personalized Dashboard
- Logout Functionality

### ✈️ Trip Management

- Create a new trip
- View all personal trips
- View individual trip details
- Edit existing trips
- Delete trips with confirmation
- Trip title and destination
- Start and end dates
- Trip description
- Trip rating from 1–5
- User-specific trip data
- Protected Trip CRUD APIs
- Ownership validation for update and delete operations
- Empty state when no trips are available
- Loading and error handling

### ⚙️ Application

- MongoDB Database Integration
- React + Vite Frontend
- Client-side Routing using React Router
- REST API using Express.js
- Frontend-Backend communication using Axios

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router DOM
- Axios
- JavaScript
- HTML
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- JSON Web Token (JWT)
- dotenv
- CORS

---

## 📁 Project Structure

```text
tripvault/

│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TripCard.jsx
│   │   │   └── TripForm.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── user.js
│   │   └── Trip.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   └── trips.js
│   │
│   ├── index.js
│   └── package.json
│
├── .gitignore
└── README.md