const express = require("express");
const cors = require("cors");
require("dotenv").config();

const meRoutes = require("./routes/me.routes");
const authRoutes = require("./modules/auth/routes/auth.routes");

const usersRoutes = require("./modules/users");

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// LOGS
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.path}`);
    next();
});

// ❌ ESTO ESTABA MAL / INCOMPLETO
// app.use("/api", meRoutes)

// AUTH
app.use("/api/auth", authRoutes);

// USERS
app.use("/api/v1/users", usersRoutes);

// HEALTH
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

module.exports = app;