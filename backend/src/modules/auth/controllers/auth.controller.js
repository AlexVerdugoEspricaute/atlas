const jwtService = require("../../../auth/jwt.service");

const login = (req, res) => {
    try {
        const { id_token } = req.body;

        if (!id_token) {
            return res.status(400).json({ message: "id_token required" });
        }

        const user = {
            id: "atlas-user",
            email: "alex@atlas.com",
            role_id: 1
        };

        const token = jwtService.generateToken(user);

        return res.json({
            token,
            user
        });

    } catch (error) {
        return res.status(500).json({ message: "login error" });
    }
};

const me = (req, res) => {
    try {
        return res.json({
            user: req.user
        });
    } catch (error) {
        return res.status(500).json({ message: "me error" });
    }
};

module.exports = {
    login,
    me
};