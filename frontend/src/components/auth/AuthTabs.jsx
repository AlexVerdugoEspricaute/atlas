import { Tabs, Tab } from "@mui/material";

export default function AuthTabs({
    value,
    onChange,
}) {
    return (
        <Tabs
            value={value}
            onChange={onChange}
            variant="fullWidth"
            sx={{
                mb: 3,
            }}
        >
            <Tab label="Iniciar sesión" />

            <Tab label="Registrarse" />
        </Tabs>
    );
}