import { useState } from "react";

import {
    TextField,
    IconButton,
    InputAdornment
} from "@mui/material";

import {
    Visibility,
    VisibilityOff
} from "@mui/icons-material";


export default function PasswordField({
    label = "Contraseña",
    name,
    value,
    onChange,
    error = false,
    helperText = "",
    disabled = false,
    autoComplete = "current-password",
    sx
}) {

    const [showPassword, setShowPassword] = useState(false);


    return (
        <TextField
            fullWidth
            margin="dense"

            label={label}

            name={name}

            type={
                showPassword
                ? "text"
                : "password"
            }

            autoComplete={autoComplete}

            value={value}

            onChange={onChange}

            error={error}

            helperText={helperText}

            disabled={disabled}

            sx={sx}


            slotProps={{
                input:{
                    endAdornment:(
                        <InputAdornment position="end">

                            <IconButton
                                onClick={() =>
                                    setShowPassword(
                                        prev => !prev
                                    )
                                }

                                edge="end"

                                disabled={disabled}

                                sx={{
                                    color:"#6E0D25"
                                }}
                            >

                                {
                                    showPassword
                                    ?
                                    <VisibilityOff />
                                    :
                                    <Visibility />
                                }

                            </IconButton>

                        </InputAdornment>
                    )
                }
            }}

        />
    );
}