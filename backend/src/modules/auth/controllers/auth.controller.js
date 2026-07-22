const jwtService = require("../../../auth/jwt.service");
const azureService = require("../../../auth/azure.service");
const usersService = require("../../users/services/users.service");


const login = async (req, res) => {
    try {
        const {
            type,
            id_token,
            email,
            password
        } = req.body;

        const isMicrosoft =
            type === "microsoft" || (!type && id_token);
        const isLocal =
            type === "local";
        if (isMicrosoft) {
            if (!id_token) {
                return res.status(400).json({
                    message: "Se requiere token Microsoft"
                });
            }

            let decoded;
            try {
                decoded =
                    await azureService.validateAzureToken(id_token);
            } catch (error) {
                console.error(
                    "TOKEN MICROSOFT ERROR:",
                    error.message
                );
                return res.status(401).json({
                    message: "Token Microsoft inválido"
                });
            }

            const microsoftEmail =
                (
                    decoded.email ||
                    decoded.preferred_username ||
                    decoded.upn
                )?.toLowerCase();

            if (!microsoftEmail) {
                return res.status(400).json({
                    message: "Microsoft no entregó email"
                });
            }

            const azureUser = {
                azureOid: decoded.oid,
                email: microsoftEmail,
                name: decoded.name || ""
            };

            const dbUser =
                await usersService.findOrCreateMicrosoftUser(
                    azureUser
                );

            const token =
                jwtService.generateToken(dbUser);

            return res.json({
                token,
                user: dbUser
            });
        }

        if (isLocal) {
            if (!email || !password) {
                return res.status(400).json({
                    message: "Email y contraseña requeridos"
                });
            }

            const dbUser =
                await usersService.loginWithCredentials(
                    email.toLowerCase(),
                    password
                );

            if (!dbUser) {
                return res.status(401).json({
                    message: "Credenciales incorrectas"
                });
            }

            const token =
                jwtService.generateToken(dbUser);

            return res.json({
                token,
                user: dbUser
            });
        }

        return res.status(400).json({
            message: "Tipo de login inválido"
        });

    } catch (error) {
        console.error(
            "[AUTH ERROR]",
            error
        );
        return res.status(500).json({
            message: "Error interno"
        });
    }
};

const register = async (req, res) => {
    try {
        const {
            email,
            password,
            first_name,
            last_name
        } = req.body;

        if (!email || !password || !first_name || !last_name) {
            return res.status(400).json({
                message: "Todos los campos son requeridos"
            });
        }

    const existing =
        await usersService.findByEmail(
            email.toLowerCase()
        )
    if(existing){
        if(existing.is_active){
            return res.status(409).json({
                message:"El email ya está registrado"
            });
        }

        const user =
            await usersService.reactivateLocalUser(
                existing.id,
                {
                    email:email.toLowerCase(),
                    password,
                    first_name,
                    last_name
                }
            );

        const token =
            jwtService.generateToken(user);
        return res.json({
            token,
            user
        });
    }

    const newUser =
        await usersService.registerLocalUser({
            email:email.toLowerCase(),
            password,
            first_name,
            last_name
        });

    const token =
        jwtService.generateToken(newUser);
    return res.status(201).json({
        token,
        user:newUser
    });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error creando cuenta"
        });
    }
};

const me = async (req, res) => {
    try {
        const user =
            await usersService.getUserById(req.user.id);
        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }
        return res.json({ user });
    } catch (error) {
        return res.status(500).json({
            message: "Error obteniendo usuario"
        });
    }
};

module.exports = {
    login,
    register,
    me
};