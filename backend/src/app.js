const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./modules/auth/routes/auth.routes");
const usersRoutes = require("./modules/users");

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        process.env.FRONTEND_URL
    ],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// LOGS
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.path}`);
    next();
});

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/v1/users", usersRoutes);

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

module.exports = app;