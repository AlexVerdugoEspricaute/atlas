import { useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    TextField
} from "@mui/material";
import { inputSx } from "../../styles/inputStyles";
import { useNavigate } from "react-router-dom";
import { loginWithCredentials, registerUser } from "@/services/auth.service";
import { useAuth } from "@/store/AuthContext";
import { 
    showSuccessToast, 
    showErrorToast, 
    showLoadingOverlay, 
    closeAlerts, 
    showError 
} from "@/utils/alerts";

export default function LocalLoginForm({ tab }) {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            showErrorToast("Por favor, ingresa correo y contraseña.");
            return;
        }

        setLoading(true);
        showLoadingOverlay("Iniciando sesión...");
        
        try {
            const { token, user } = await loginWithCredentials(form.email, form.password);
            closeAlerts();
            login(token, user);
            showSuccessToast(`¡Bienvenido/a de vuelta!`);
            navigate("/");
        } catch (err) {
            closeAlerts();
            setLoading(false);
            showErrorToast(err.message || "Credenciales inválidas.");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!form.first_name || !form.last_name || !form.email || !form.password) {
            showErrorToast("Por favor, completa todos los campos.");
            return;
        }

        setLoading(true);
        showLoadingOverlay("Creando tu cuenta...");
        
        try {
            const { token, user } = await registerUser(form);
            closeAlerts();
            login(token, user);
            showSuccessToast(`¡Bienvenido/a, ${user.first_name}!`);
            navigate("/");
        } catch (err) {
            closeAlerts();
            setLoading(false);
            
            // Interceptamos la respuesta para identificar cuentas existentes de forma inteligente
            const errorText = err.message || "";
            const isDuplicate = 
                errorText.toLowerCase().includes("exist") || 
                errorText.toLowerCase().includes("registrado") || 
                errorText.toLowerCase().includes("conflict");

            if (isDuplicate) {
                // Si el usuario existe, se muestra el cuadro de error formal idéntico a tu logout
                showError(
                    "Cuenta ya registrada", 
                    "El correo electrónico ingresado ya se encuentra vinculado a otra cuenta en la plataforma."
                );
            } else {
                // Cualquier otro error común se notifica mediante un Toast rápido en la esquina
                showErrorToast(errorText || "No se pudo procesar la solicitud.");
            }
        }
    };

    return (
        <Box sx={{ mt: 2 }}>
            {/* ── SECCIÓN DE LOGIN ── */}
            {tab === 0 && (
                <Box component="form" onSubmit={handleLogin}>
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        sx={{ ...inputSx, mb: 2 }}
                        disabled={loading}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Password"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        sx={{ ...inputSx, mb: 2 }}
                        disabled={loading}
                    />
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        sx={{
                            mt: 2,
                            py: 1.2,
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 600,
                            bgcolor: "#6E0D25",
                            "&:hover": { bgcolor: "#5A0B1F" }
                        }}
                    >
                        {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : "Iniciar sesión"}
                    </Button>
                </Box>
            )}

            {/* ── SECCIÓN DE REGISTRO ── */}
            {tab === 1 && (
                <Box component="form" onSubmit={handleRegister}>
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Nombre"
                        name="first_name"
                        value={form.first_name}
                        onChange={handleChange}
                        sx={{ ...inputSx, mb: 1.5 }}
                        disabled={loading}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Apellido"
                        name="last_name"
                        value={form.last_name}
                        onChange={handleChange}
                        sx={{ ...inputSx, mb: 1.5 }}
                        disabled={loading}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        sx={{ ...inputSx, mb: 1.5 }}
                        disabled={loading}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Password"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        sx={{ ...inputSx, mb: 2 }}
                        disabled={loading}
                    />
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        sx={{
                            mt: 2,
                            py: 1.2,
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 600,
                            bgcolor: "#6E0D25",
                            "&:hover": { bgcolor: "#5A0B1F" }
                        }}
                    >
                        {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : "Crear cuenta"}
                    </Button>
                </Box>
            )}
        </Box>
    );
}
