# ✈️ TripVault

A secure MERN stack travel memory journal application.

TripVault is a full-stack web application built using the MERN stack. It allows users to create an account, securely log in, and access a personalized dashboard.

## 🚀 Features

- User Registration
- Secure User Login
- Password Hashing using bcrypt
- JWT-based Authentication
- Protected User Route
- Personalized Dashboard
- Logout Functionality
- MongoDB Database Integration
- React + Vite Frontend
- Client-side Routing using React Router
- REST API using Express.js
- Frontend-Backend communication using Axios

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

## 📁 Project Structure

```text
tripvault/
│
├── client/
│   ├── src/
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
│   │   └── user.js
│   │
│   ├── routes/
│   │   └── auth.js
│   │
│   ├── index.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## ⚙️ Getting Started

Follow the steps below to run TripVault locally.

### 1. Clone the Repository

```bash
git clone https://github.com/sahupradeep1910/Tripvault
cd tripvault
```

## 🔧 Backend Setup

Navigate to the server folder:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder.

Add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
node index.js
```

The backend will run on:

```text
http://localhost:5000
```

## 💻 Frontend Setup

Open a new terminal and navigate to the client folder:

```bash
cd client
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

## 🔐 Authentication

TripVault uses JWT (JSON Web Token) for user authentication.

### Authentication Flow

```text
Register
   ↓
Password hashed using bcrypt
   ↓
User stored in MongoDB
   ↓
Login
   ↓
JWT token generated
   ↓
Token stored in Local Storage
   ↓
Protected Dashboard
   ↓
JWT verified by middleware
   ↓
Authenticated User Data
```

## 🌐 API Endpoints

### 1. Register User

**POST**

```text
/api/auth/register
```

Request body:

```json
{
  "name": "Your Name",
  "email": "your@email.com",
  "password": "yourpassword"
}
```

### 2. Login User

**POST**

```text
/api/auth/login
```

Request body:

```json
{
  "email": "your@email.com",
  "password": "yourpassword"
}
```

A successful login returns a JWT token.

### 3. Get Current User

**GET**

```text
/api/auth/me
```

This is a protected endpoint and requires a valid JWT token.

Request header:

```text
Authorization: Bearer <JWT_TOKEN>
```

The endpoint returns the authenticated user's information without exposing the password.

## 🛡️ Security

- Passwords are hashed using bcryptjs before being stored.
- JWT is used for authentication.
- Protected routes require a valid authentication token.
- Password information is excluded from the `/me` response.
- Sensitive configuration is stored in environment variables.
- `.env` is excluded from Git using `.gitignore`.

## 🧪 Testing

The authentication flow was tested using an API testing client.

The following functionality was verified:

- User registration
- Duplicate user handling
- User login
- Invalid login handling
- JWT token generation
- Protected `/me` endpoint
- Unauthorized access without token
- Dashboard authentication
- Logout functionality
- Redirect to login after logout

## 📌 Current Project Status

### Week 1 — Project Setup & Authentication

- [x] Node.js & Express setup
- [x] MongoDB connection
- [x] User model
- [x] User registration
- [x] Password hashing
- [x] User login
- [x] JWT authentication
- [x] Authentication middleware
- [x] Protected `/me` route
- [x] React + Vite setup
- [x] Login page
- [x] Register page
- [x] Protected dashboard
- [x] Logout functionality
- [x] Frontend-backend authentication flow
- [x] Project documentation

## 🔮 Future Scope

The application can be extended with the following features:

- Add travel memories
- Create and edit travel entries
- Add travel locations
- Upload travel photos
- Organize memories by date
- Search travel memories
- Display travel locations on a map
- User-specific travel journals

## 🔒 Environment Variables

The following environment variables are required:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> Never commit the actual `.env` file or expose secret credentials publicly.

## 👨‍💻 Author

**Pradeep Kumar Sahu**

B.Tech Student  
ITER, SOA University

## ⭐ Project

**TripVault — Travel Memory Journal**

Built using the MERN stack.