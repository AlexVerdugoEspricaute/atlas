const jwtService = require("../../../auth/jwt.service");
const azureService = require("../../../auth/azure.service");
const usersService = require("../../users/services/users.service");

const login = async (req, res) => {
    try {
        const { type, id_token, email, password } = req.body;

        const isMicrosoft = type === "microsoft" || (!type && id_token);
        const isLocal = type === "local";

        if (isMicrosoft) {
            if (!id_token) {
                return res.status(400).json({ message: "Se requiere el token de Microsoft" });
            }

            let decoded;

            try {
                decoded = await azureService.validateAzureToken(id_token);
            } catch (err) {
                return res.status(401).json({
                    message: "Token de Microsoft inválido"
                });
            }

            const azureUser = {
                azureOid: decoded.oid,
                email: (decoded.email || decoded.preferred_username).toLowerCase(),
                name: decoded.name
            };

            const dbUser = await usersService.findOrCreateMicrosoftUser(azureUser);
            const token = jwtService.generateToken(dbUser);

            return res.json({ token, user: dbUser });
        }

        if (isLocal) {
            if (!email || !password) {
                return res.status(400).json({ message: "El email y la contraseña son requeridos" });
            }

            const dbUser = await usersService.loginWithCredentials(email.toLowerCase(), password);

            if (!dbUser) {
                return res.status(401).json({ message: "Credenciales incorrectas" });
            }

            const token = jwtService.generateToken(dbUser);

            return res.json({ token, user: dbUser });
        }

        return res.status(400).json({ message: "Tipo de login no válido" });

    } catch (error) {
        return res.status(500).json({ message: "Error al iniciar sesión" });
    }
};

const register = async (req, res) => {
    try {
        const { email, password, first_name, last_name } = req.body;

        if (!email || !password || !first_name || !last_name) {
            return res.status(400).json({ message: "Todos los campos son requeridos" });
        }

        const existing = await usersService.findByEmail(email.toLowerCase());
        if (existing) {
            return res.status(409).json({ message: "El email ya está registrado" });
        }

        const newUser = await usersService.registerLocalUser({
            email: email.toLowerCase(),
            password,
            first_name,
            last_name
        });

        const token = jwtService.generateToken(newUser);

        return res.status(201).json({ token, user: newUser });

    } catch (error) {
        return res.status(500).json({ message: "Error al crear la cuenta" });
    }
};

const me = async (req, res) => {
    try {
        const user = await usersService.getUserById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json({ user });

    } catch (error) {
        return res.status(500).json({ message: "Me error" });
    }
};

module.exports = { login, register, me };