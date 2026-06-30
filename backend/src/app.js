const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Modules
const usersRoutes = require("./modules/users");

const app = express();

// ======================
// MIDDLEWARES
// ======================
app.use(cors());
app.use(express.json());

// ======================
// ROUTES
// ======================
app.use("/api/v1/users", usersRoutes);

// ======================
// HEALTH CHECK
// ======================
app.get("/health", (req, res) => {
    return res.json({
        status: "ok",
        service: "Atlas API",
        timestamp: new Date().toISOString()
    });
});

module.exports = app;