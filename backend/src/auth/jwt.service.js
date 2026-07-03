const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role_id: user.role_id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES
        }
    );
};

module.exports = { generateToken };