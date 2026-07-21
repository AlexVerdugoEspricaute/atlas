import { useState } from "react";

import {
    Box,
    CircularProgress,
    TextField,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { AtlasButton } from "@/design-system";
import PasswordField from "@/components/common/PasswordField";

import { inputSx } from "@/styles/inputStyles";

import {
    loginWithCredentials,
    registerUser,
} from "@/services/auth.service";

import { useAuth } from "@/store/AuthContext";

import {
    loginSchema,
    registerSchema,
} from "@/validations/auth.validation";

import {
    showSuccessToast,
    showErrorToast,
    showLoadingOverlay,
    closeAlerts,
    showError,
} from "@/utils/alerts";

export default function LocalLoginForm({ tab }) {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});

    const [form, setForm] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (fieldErrors[name]) {
            setFieldErrors((prev) => {
                const copy = { ...prev };
                delete copy[name];
                return copy;
            });
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        setFieldErrors({});

        const validation = loginSchema.safeParse({
            email: form.email,
            password: form.password,
        });

        if (!validation.success) {
            const errors = {};

            validation.error.issues.forEach((issue) => {
                errors[issue.path[0]] = issue.message;
            });

            setFieldErrors(errors);

            showErrorToast("Verifica los datos ingresados.");

            return;
        }

        try {
            setLoading(true);

            showLoadingOverlay("Iniciando sesión...");

            const response = await loginWithCredentials(
                form.email,
                form.password
            );

            const { token, user } = response;

            closeAlerts();

            login(token, user);

            showSuccessToast(
                `¡Bienvenido/a ${user.first_name || ""}!`
            );

            navigate("/");
        } catch (err) {
            closeAlerts();

            console.error("LOGIN ERROR:", err);

            showErrorToast(
                err?.message || "Credenciales inválidas."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        setFieldErrors({});

        const validation = registerSchema.safeParse(form);

        if (!validation.success) {
            const errors = {};

            validation.error.issues.forEach((issue) => {
                errors[issue.path[0]] = issue.message;
            });

            setFieldErrors(errors);

            showErrorToast("El formulario contiene errores.");

            return;
        }

        try {
            setLoading(true);

            showLoadingOverlay("Creando cuenta...");

            const response = await registerUser(form);

            const { token, user } = response;

            closeAlerts();

            login(token, user);

            showSuccessToast(
                `¡Bienvenido/a ${user.first_name}!`
            );

            navigate("/");
        } catch (err) {
            closeAlerts();

            console.error("REGISTER ERROR:", err);

            const errorText = err?.message || "";

            const isDuplicate =
                errorText.toLowerCase().includes("registrado") ||
                errorText.toLowerCase().includes("exist") ||
                errorText.toLowerCase().includes("conflict");

            if (isDuplicate) {
                showError(
                    "Cuenta ya registrada",
                    "Este correo ya está asociado a una cuenta."
                );
            } else {
                showErrorToast(
                    errorText || "No se pudo crear la cuenta."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ mt: 2 }}>
            {tab === 0 && (
                <Box
                    component="form"
                    onSubmit={handleLogin}
                    noValidate
                >
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={handleChange}
                        error={!!fieldErrors.email}
                        helperText={fieldErrors.email}
                        sx={inputSx}
                        disabled={loading}
                    />

                    <PasswordField
                        label="Contraseña"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        error={!!fieldErrors.password}
                        helperText={fieldErrors.password}
                        autoComplete="current-password"
                        disabled={loading}
                        sx={inputSx}
                    />

                    <AtlasButton
                        fullWidth
                        type="submit"
                        disabled={loading}
                        sx={{ mt: 2 }}
                    >
                        {loading ? (
                            <CircularProgress
                                size={24}
                                sx={{
                                    color: "common.white",
                                }}
                            />
                        ) : (
                            "Iniciar sesión"
                        )}
                    </AtlasButton>
                </Box>
            )}

            {tab === 1 && (
                <Box
                    component="form"
                    onSubmit={handleRegister}
                    noValidate
                >
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Nombre"
                        name="first_name"
                        autoComplete="given-name"
                        value={form.first_name}
                        onChange={handleChange}
                        error={!!fieldErrors.first_name}
                        helperText={fieldErrors.first_name}
                        sx={inputSx}
                        disabled={loading}
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Apellido"
                        name="last_name"
                        autoComplete="family-name"
                        value={form.last_name}
                        onChange={handleChange}
                        error={!!fieldErrors.last_name}
                        helperText={fieldErrors.last_name}
                        sx={inputSx}
                        disabled={loading}
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={handleChange}
                        error={!!fieldErrors.email}
                        helperText={fieldErrors.email}
                        sx={inputSx}
                        disabled={loading}
                    />

                    <PasswordField
                        label="Contraseña"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        error={!!fieldErrors.password}
                        helperText={fieldErrors.password}
                        autoComplete="new-password"
                        disabled={loading}
                        sx={inputSx}
                    />

                    <AtlasButton
                        fullWidth
                        type="submit"
                        disabled={loading}
                        sx={{ mt: 2 }}
                    >
                        {loading ? (
                            <CircularProgress
                                size={24}
                                sx={{
                                    color: "common.white",
                                }}
                            />
                        ) : (
                            "Crear cuenta"
                        )}
                    </AtlasButton>
                </Box>
            )}
        </Box>
    );
}