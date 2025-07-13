# 📸 PicLingo

PicLingo is a full-stack web app that converts images into inspirational quote-based content using AI. Users can sign up, upload an image, and receive a quote generated from the image content. Built with a React frontend and Express.js + MongoDB backend.

---

## 📌 Features

- 🧠 AI-generated quotes from images  
- 📸 Image upload and preview  
- 🔐 User authentication (Login/Signup)  
- 🌐 Deployed frontend (Vercel) + backend (Render)  
- 🔄 JSON-based communication (no cookies)  
- 🧱 Clean and scalable backend structure

---

## 🧩 Tech Stack

- **Frontend**: React, Tailwind CSS, Vercel
- **Backend**: Node.js, Express.js, MongoDB, Render
- **Other**: CORS, dotenv, mongoose

---

## 🚀 Getting Started

### 📦 Prerequisites

- Node.js & npm
- MongoDB Atlas URI or local MongoDB
- Git

---

### 🛠️ Backend Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/Prince-singh-1619/PicLingo.git
   cd PicLingo/backend
Create a .env file:

env
Copy
Edit
FRONTEND_URL=https://pic-lingo.vercel.app
MONGODB_URI=<your_mongodb_connection_string>
Install dependencies:

bash
Copy
Edit
npm install
Start the server:

bash
Copy
Edit
npm start
🧪 Test Login Route (Optional)
bash
Copy
Edit
curl -X POST http://localhost:8080/api/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\", \"password\":\"123456\"}"
💻 Frontend Setup
Go to frontend folder:

bash
Copy
Edit
cd ../frontend
Install dependencies:

bash
Copy
Edit
npm install
Add environment variable:

ini
Copy
Edit
REACT_APP_API_URL=https://your-backend.onrender.com/api
Run the frontend:

bash
Copy
Edit
npm start
⚙️ Deployment
🌐 Backend on Render
Connect your GitHub repo to Render

Set:

Build Command: npm install

Start Command: npm start

Environment Variables:

FRONTEND_URL=https://pic-lingo.vercel.app

MONGODB_URI=<your_mongo_uri>

📲 Frontend on Vercel
Push frontend to GitHub

Import to Vercel

Set environment variable:

ini
Copy
Edit
REACT_APP_API_URL=https://your-backend.onrender.com/api

