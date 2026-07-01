const express = require("express");
const cors = require("cors");
require("dotenv").config();
const supabase = require("./config/supabase");


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

app.get("/health/db", async (req, res) => {
    try {
        const { error } = await supabase
            .from("users")
            .select("id")
            .limit(1);

        if (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }

        return res.json({
            success: true,
            message: "Supabase connection successful",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

module.exports = app;