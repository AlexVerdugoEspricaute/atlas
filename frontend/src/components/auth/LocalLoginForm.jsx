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
import { loginSchema, registerSchema } from "@/validations/auth.validation";
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
    
    // Estado reactivo para almacenar los mensajes de error por cada input de MUI
    const [fieldErrors, setFieldErrors] = useState({});

    const [form, setForm] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        
        // Limpieza automática del error en foco al escribir
        if (fieldErrors[name]) {
            setFieldErrors(prev => {
                const copy = { ...prev };
                delete copy[name];
                return copy;
            });
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setFieldErrors({});

        // Validación con Zod para el Login
        const validation = loginSchema.safeParse({ email: form.email, password: form.password });
        
        if (!validation.success) {
            const errors = {};
            validation.error.issues.forEach(issue => {
                errors[issue.path[0]] = issue.message;
            });
            setFieldErrors(errors);
            showErrorToast("Verifica los datos ingresados.");
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
        setFieldErrors({});

        // Validación con Zod para el Registro
        const validation = registerSchema.safeParse(form);
        
        if (!validation.success) {
            const errors = {};
            validation.error.issues.forEach(issue => {
                errors[issue.path[0]] = issue.message;
            });
            setFieldErrors(errors);
            showErrorToast("El formulario contiene errores de validación.");
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
            
            const errorText = err.message || "";
            const isDuplicate = 
                errorText.toLowerCase().includes("exist") || 
                errorText.toLowerCase().includes("registrado") || 
                errorText.toLowerCase().includes("conflict");

            if (isDuplicate) {
                showError(
                    "Cuenta ya registrada", 
                    "El correo electrónico ingresado ya se encuentra vinculado a otra cuenta en la plataforma."
                );
            } else {
                showErrorToast(errorText || "No se pudo procesar la solicitud.");
            }
        }
    };

    return (
        <Box sx={{ mt: 2 }}>
            {/* ── SECCIÓN DE LOGIN ── */}
            {tab === 0 && (
                <Box component="form" onSubmit={handleLogin} noValidate>
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        error={!!fieldErrors.email}
                        helperText={fieldErrors.email}
                        sx={{ ...inputSx, mb: fieldErrors.email ? 0.5 : 2 }}
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
                        error={!!fieldErrors.password}
                        helperText={fieldErrors.password}
                        sx={{ ...inputSx, mb: fieldErrors.password ? 0.5 : 2 }}
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
                <Box component="form" onSubmit={handleRegister} noValidate>
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Nombre"
                        name="first_name"
                        value={form.first_name}
                        onChange={handleChange}
                        error={!!fieldErrors.first_name}
                        helperText={fieldErrors.first_name}
                        sx={{ ...inputSx, mb: fieldErrors.first_name ? 0.5 : 1.5 }}
                        disabled={loading}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Apellido"
                        name="last_name"
                        value={form.last_name}
                        onChange={handleChange}
                        error={!!fieldErrors.last_name}
                        helperText={fieldErrors.last_name}
                        sx={{ ...inputSx, mb: fieldErrors.last_name ? 0.5 : 1.5 }}
                        disabled={loading}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        error={!!fieldErrors.email}
                        helperText={fieldErrors.email}
                        sx={{ ...inputSx, mb: fieldErrors.email ? 0.5 : 1.5 }}
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
                        error={!!fieldErrors.password}
                        helperText={fieldErrors.password}
                        sx={{ ...inputSx, mb: fieldErrors.password ? 0.5 : 2 }}
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
