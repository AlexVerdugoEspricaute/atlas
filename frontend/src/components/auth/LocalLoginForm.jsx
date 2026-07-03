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

export default function LocalLoginForm({ tab }) {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        setError("");
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { token, user } = await loginWithCredentials(
                form.email,
                form.password
            );

            login(token, user);
            navigate("/");
        } catch (err) {
            setError(err.message);
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
            navigate("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ mt: 2 }}>

            {tab === 0 && (
                <Box component="form" onSubmit={handleLogin}>
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Email"
                        name="email"
                        onChange={handleChange}
                        sx={{ ...inputSx, mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Constraseña"
                        type="password"
                        name="password"
                        onChange={handleChange}
                    sx={{ ...inputSx, mb: 2 }}
                    />

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{
                            mt: 2,
                            bgcolor: "#6E0D25",
                            "&:hover": { bgcolor: "#5A0B1F" }
                        }}
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress size={20} />
                        ) : (
                            "Iniciar sesión"
                        )}
                    </Button>
                </Box>
            )}

            {tab === 1 && (
                <Box component="form" onSubmit={handleRegister}>
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Nombre"
                        name="first_name"
                        onChange={handleChange}
                        sx={{ ...inputSx }}
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Apellido"
                        name="last_name"
                        onChange={handleChange}
                        sx={{ ...inputSx }}
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Email"
                        name="email"
                        onChange={handleChange}
                        sx={{ ...inputSx }}
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Contraseña"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        sx={{ ...inputSx }}
                    />

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{
                            mt: 2,
                            bgcolor: "#6E0D25",
                            "&:hover": { bgcolor: "#5A0B1F" },
                            ...inputSx
                        }}
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress size={20} />
                        ) : (
                            "Crear cuenta"
                        )}
                    </Button>
                </Box>
            )}

        </Box>
    );
}