# TripVault

TripVault is a MERN stack travel memory journal application where users can create an account, securely log in, and access their personalized dashboard.

## 🚀 Features

- User registration
- Secure password hashing using bcrypt
- User login
- JWT-based authentication
- Protected user profile route
- Protected dashboard
- Logout functionality
- MongoDB database integration
- React frontend with React Router

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- JSON Web Token (JWT)
- CORS
- dotenv

## 📁 Project Structure

```text
tripvault/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   └── App.jsx
│   └── package.json
│
├── server/
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   └── user.js
│   ├── routes/
│   │   └── auth.js
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md