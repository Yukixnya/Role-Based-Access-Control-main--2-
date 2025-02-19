const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();

//new addded


// Middleware
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded images

// Routes
app.use("/api/user", userRoutes);
//new aded

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Start the server
const PORT = process.env.PORT || 7001;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
