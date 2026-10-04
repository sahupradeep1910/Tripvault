# ✈️ TripVault

A secure MERN stack travel memory journal application.

TripVault is a full-stack web application built using the MERN stack. It allows users to create an account, securely log in, manage their personal travel memories, upload trip photos, and maintain a public travel profile.

---

## 🎯 Project Objective

The objective of TripVault is to provide users with a secure platform to manage and share their travel memories.

The application provides authenticated users with:

- User registration and secure login
- Personal trip management
- Complete Trip CRUD operations
- Trip photo uploads using Cloudinary
- Cover images and multiple trip photos
- Public travel profiles
- Profile bio management
- Public trip and photo display

---

## 🚀 Features

### 🔐 Authentication

- User Registration
- Unique Username
- Secure User Login
- Password Hashing using bcrypt
- JWT-based Authentication
- Protected Routes
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
- Loading and error handling

### 📸 Trip Photo Uploads

- Upload trip images using Cloudinary
- Multer-based image upload middleware
- Cloudinary image storage
- Cover image for trips
- Multiple photos for each trip
- Photo grid on Trip Details page
- Photo grid on Public Profile
- Supported image formats:
  - JPG
  - JPEG
  - PNG
  - WEBP
- Maximum image size of 5 MB

### 👤 Public Profiles

- Unique username
- Public profile accessible without login
- Profile name
- Username
- Profile bio
- Public trip grid
- Trip cover images
- Multiple trip photos
- Public profile API without authentication
- Safe public profile fields without exposing email or password

### ✏️ Profile Management

- My Profile link from Dashboard
- Edit Profile page
- Update profile bio
- Protected profile update API

### ⚙️ Application

- MongoDB Database Integration
- React + Vite Frontend
- Client-side Routing using React Router
- REST API using Express.js
- Frontend-backend communication using Axios
- JWT authentication
- Cloudinary image storage

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
- Multer
- Cloudinary
- multer-storage-cloudinary

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
│   │   │   ├── login.jsx
│   │   │   ├── register.jsx
│   │   │   ├── dashboard.jsx
│   │   │   ├── TripDetails.jsx
│   │   │   ├── PublicProfile.jsx
│   │   │   └── EditProfile.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── upload.js
│   │
│   ├── models/
│   │   ├── user.js
│   │   └── Trip.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── trips.js
│   │   └── profile.js
│   │
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md