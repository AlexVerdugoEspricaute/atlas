const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
    return res.json({
        status: "ok",
        service: "Atlas API",
        timestamp: new Date().toISOString()
    });
});

// Server configuration
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Atlas API running on port ${PORT}`);
});