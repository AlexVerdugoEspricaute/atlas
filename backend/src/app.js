const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const authRoutes = require("./modules/auth/routes/auth.routes");
const usersRoutes = require("./modules/users");

const app = express();

app.use(helmet());

app.use(cors({
    origin(origin, callback) {

        const allowed = [
            "http://localhost:5173",
            process.env.FRONTEND_URL
        ].filter(Boolean);

        if (!origin || allowed.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
    },

    credentials:true,

    allowedHeaders:[
        "Content-Type",
        "Authorization"
    ]
}));

app.use(express.json());


if(process.env.NODE_ENV !== "production"){
    app.use((req,res,next)=>{
        console.log(`[${req.method}] ${req.path}`);
        next();
    });
}


app.use("/api/auth", authRoutes);
app.use("/api/v1/users", usersRoutes);


app.get("/health",(req,res)=>{
    res.json({
        status:"ok"
    });
});


app.use((err,req,res,next)=>{

    console.error(err);

    res.status(500).json({
        message:"Internal server error"
    });

});


module.exports = app;