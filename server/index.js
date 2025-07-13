const dotenv = require('dotenv')
dotenv.config()     //Load env variables

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const cookieParser = require("cookie-parser")
const router = require('./routes/index')

// const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 8080

connectDB()     //calling MongoDB

//middlewares
app.use(cors(
    {
        // origin: 'https://pic-lingo.vercel.app',
        origin: process.env.FRONTEND_URL,
        credentials: true,
        method: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        // credentials: false,
        allowedHeaders: ['Content-Type', 'Authorization']
    }
))
app.use(express.json({ limit: "10mb" }))     //For handling JSON requests
app.use(cookieParser())

//DB connection
mongoose.connect(process.env.MONGODB_URI, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        // tls: false 
    })
    .then(()=> console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error: ", err))


app.use("/api", router)

//start server
app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})
