const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbo = require("./db/conn");
const recordRoutes = require("./routes/record");

dotenv.config(); // Load environment variables
const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
    origin: "https://vcc-front.onrender.com", // Allow only this domain
    methods: "GET,POST,PUT,DELETE",           // Specify allowed methods
    credentials: true                          // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(recordRoutes); // Use the record routes

// Health check route
app.get("/", (req, res) => {
    res.send("App is running");
});

// Connect to MongoDB and start server
dbo.connectToMongoDB((error) => {
    if (error) {
        console.error("MongoDB connection error:", error);
        return; // Stop if there is a connection error
    }

    app.listen(port, () => {
        console.log("Server is running on port:", port);
    });
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error("Server error:", err);
    res.status(500).send("Internal Server Error");
});
