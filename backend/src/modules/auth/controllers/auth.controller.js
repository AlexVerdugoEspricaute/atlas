const jwtService = require("../../../auth/jwt.service");
const azureService = require("../../../auth/azure.service");
const usersService = require("../../users/services/users.service");

/**
 * POST /api/auth/login
 * Body Microsoft: { type: "microsoft", id_token }
 * Body Local:     { type: "local", email, password }
 * Body legacy:    { id_token }  ← sin "type", mantiene compatibilidad
 */
const login = async (req, res) => {
    try {
        const { type, id_token, email, password } = req.body;

        const isMicrosoft = type === "microsoft" || (!type && id_token);
        const isLocal = type === "local";

        // ── Microsoft ─────────────────────────────────────────────────────────
        if (isMicrosoft) {
            if (!id_token) {
                return res.status(400).json({ message: "id_token required" });
            }

            let decoded;
            try {
                decoded = await azureService.validateAzureToken(id_token);
            } catch (err) {
                return res.status(401).json({ message: "Invalid Azure token", detail: err.message });
            }

            const azureUser = {
                azureOid: decoded.oid,
                email: decoded.email || decoded.preferred_username,
                name: decoded.name,
            };

            const dbUser = await usersService.findOrCreateMicrosoftUser(azureUser);
            const token = jwtService.generateToken(dbUser);

            return res.json({ token, user: dbUser });
        }

        // ── Local ─────────────────────────────────────────────────────────────
        if (isLocal) {
            if (!email || !password) {
                return res.status(400).json({ message: "email and password required" });
            }

            const dbUser = await usersService.loginWithCredentials(email, password);

            if (!dbUser) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const token = jwtService.generateToken(dbUser);
            return res.json({ token, user: dbUser });
        }

        return res.status(400).json({ message: "Invalid login type. Use 'microsoft' or 'local'" });

    } catch (error) {
        console.error("[AUTH] login error:", error.message);
        return res.status(500).json({ message: "Login error" });
    }
};

/**
 * POST /api/auth/register
 * Body: { email, password, first_name, last_name }
 */
const register = async (req, res) => {
    try {
        const { email, password, first_name, last_name } = req.body;

        if (!email || !password || !first_name || !last_name) {
            return res.status(400).json({ message: "email, password, first_name and last_name required" });
        }

        const existing = await usersService.findByEmail(email);
        if (existing) {
            return res.status(409).json({ message: "Email already registered" });
        }

        const newUser = await usersService.registerLocalUser({ email, password, first_name, last_name });
        const token = jwtService.generateToken(newUser);

        return res.status(201).json({ token, user: newUser });

    } catch (error) {
        console.error("[AUTH] register error:", error.message);
        return res.status(500).json({ message: "Register error" });
    }
};

/**
 * GET /api/auth/me
 * Requiere jwtMiddleware → req.user tiene { id, email, role_id }
 */
const me = async (req, res) => {
    try {
        const dbUser = await usersService.getUserById(req.user.id);

        if (!dbUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json({ user: dbUser });
    } catch (error) {
        console.error("[AUTH] me error:", error.message);
        return res.status(500).json({ message: "Me error" });
    }
};

module.exports = { login, register, me };
