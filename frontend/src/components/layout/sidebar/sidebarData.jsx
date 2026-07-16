import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

export const sidebarItems = [
    {
        label: "Dashboard",
        icon: <DashboardOutlinedIcon />,
        path: "/",
    },
    {
        label: "Usuarios",
        icon: <GroupOutlinedIcon />,
        path: "/usuarios",
    },
    {
        label: "Roles",
        icon: <AdminPanelSettingsOutlinedIcon />,
        path: "/roles",
    },
    {
        label: "Seguridad",
        icon: <SecurityOutlinedIcon />,
        path: "/seguridad",
    },
    {
        label: "Configuración",
        icon: <SettingsOutlinedIcon />,
        path: "/configuracion",
    },
];
