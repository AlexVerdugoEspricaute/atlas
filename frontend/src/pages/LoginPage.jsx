import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Divider,
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";

import { loginRequest } from "@/config/authConfig";
import { loginWithCredentials, registerUser } from "@/services/auth.service";
import { useAuth } from "@/store/AuthContext";

export default function LoginPage() {
    const { instance, inProgress, accounts } = useMsal();
    const { login, authError, setAuthError } = useAuth();
    const navigate = useNavigate();

    const [tab, setTab] = useState(0);
    const [form, setForm] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setError("");
        setAuthError("");
    };

    const handleLocalLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { token, user } = await loginWithCredentials(form.email, form.password);
            login(token, user);
            navigate("/", { replace: true });
        } catch (err) {
            setError(err?.message || "Credenciales incorrectas");
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { token, user } = await registerUser(form);
            login(token, user);
            navigate("/", { replace: true });
        } catch (err) {
            setError(err?.message || "Error al registrarse");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                backgroundColor: "#fafafa",
            }}
        >
            {/* Fondo curvo */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    zIndex: -1,
                    background: "linear-gradient(135deg, #e8f5e9 40%, #fafafa 40%)",
                    clipPath: "ellipse(75% 60% at 20% 20%)",
                }}
            />

            {/* Card login */}
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 420,
                    p: 4,
                    borderRadius: 4,
                    backdropFilter: "blur(12px)",
                    backgroundColor: "rgba(255,255,255,0.85)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
                    border: "1px solid rgba(0,0,0,0.05)",
                }}
            >
                {/* Logo */}
                <Typography
                    variant="h4"
                    fontWeight={800}
                    sx={{
                        textAlign: "center",
                        mb: 3,
                        background: "linear-gradient(90deg, #2e7d32, #66bb6a)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    Atlas
                </Typography>

                {/* Microsoft login */}
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={async () => {
                        try {
                            await instance.loginRedirect({
                                ...loginRequest,
                                prompt: "select_account",
                            });
                        } catch (err) {
                            setAuthError(err.message || "Error login Microsoft");
                        }
                    }}
                    sx={{
                        mb: 2,
                        py: 1.2,
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                        borderColor: "#2e7d32",
                        color: "#2e7d32",
                        "&:hover": {
                            backgroundColor: "rgba(46,125,50,0.08)",
                            borderColor: "#2e7d32",
                        },
                    }}
                >
                    Iniciar sesión con Microsoft
                </Button>

                <Divider sx={{ mb: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                        o continúa con email
                    </Typography>
                </Divider>

                {/* Tabs */}
                <Tabs
                    value={tab}
                    onChange={(_, v) => {
                        setTab(v);
                        setError("");
                        setAuthError("");
                    }}
                    variant="fullWidth"
                    sx={{ mb: 2 }}
                >
                    <Tab label="Iniciar sesión" />
                    <Tab label="Registrarse" />
                </Tabs>

                {/* Error */}
                {(error || authError) && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error || authError}
                    </Alert>
                )}

                {/* LOGIN */}
                {tab === 0 && (
                    <Box component="form" onSubmit={handleLocalLogin}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            margin="dense"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Contraseña"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            margin="dense"
                            required
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            sx={{ mt: 2, borderRadius: 2 }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={22} /> : "Entrar"}
                        </Button>
                    </Box>
                )}

                {/* REGISTER */}
                {tab === 1 && (
                    <Box component="form" onSubmit={handleRegister}>
                        <TextField
                            fullWidth
                            label="Nombre"
                            name="first_name"
                            value={form.first_name}
                            onChange={handleChange}
                            margin="dense"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Apellido"
                            name="last_name"
                            value={form.last_name}
                            onChange={handleChange}
                            margin="dense"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            margin="dense"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Contraseña"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            margin="dense"
                            required
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            sx={{ mt: 2, borderRadius: 2 }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={22} /> : "Crear cuenta"}
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
}