const cookieParser = require('cookie-parser');
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectToDB = require('./db');

const app = express();



// Middleware to parse cookies
app.use(cookieParser());

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors({
    credentials: true, // Allow sending cookies across origins
    origin: "http://localhost:3000" // Whitelist specific origin(s)
}));

// Middleware to parse incoming JSON data
app.use(express.json());

//Connecting to DB

connectToDB();


// Routes
app.use("/", require('./Routes/authRoutes'));
app.use("/task",require('./Routes/taskRoutes'));

// Start the server
app.listen(process.env.PORT, () => {
    console.log("Server is listening on port", process.env.PORT);
});
