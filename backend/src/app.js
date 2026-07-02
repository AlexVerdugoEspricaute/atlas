const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./modules/auth/routes/auth.routes");
const usersRoutes = require("./modules/users");

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL
];

app.use(cors({
    origin(origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("CORS not allowed"));
    },
    credentials: true
}));

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.path}`);
    next();
});

app.use("/api/auth", authRoutes);

app.use("/api/v1/users", usersRoutes);

app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    });
});

module.exports = app;