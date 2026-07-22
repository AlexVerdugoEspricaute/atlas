import {
    Box,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";

import {
    AccountCircleOutlined,
    LogoutOutlined,
    SecurityOutlined,
    DarkModeOutlined,
} from "@mui/icons-material";

import {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    useAuth
} from "@/store/AuthContext";

import useLogout from "@/hooks/useLogout";

import UserAvatar from "./UserAvatar";


export default function UserMenu(){

    const {
        user
    } = useAuth();

    const navigate =
        useNavigate();

    const logout =
        useLogout();

    const [
        anchorEl,
        setAnchorEl
    ] = useState(null);

    const open =
        Boolean(anchorEl);

    const handleOpen = (event)=>{
        setAnchorEl(
            event.currentTarget
        );
    };

    const handleClose = ()=>{
        setAnchorEl(null);
    };

    const fullName =
        `${user?.first_name ?? ""}
        ${user?.last_name ?? ""}`
        .trim()
        ||
        "Usuario";


    return (
        <Box>

            {/* AVATAR BUTTON */}

            <IconButton
                onClick={handleOpen}
                sx={{
                    p:0,
                    borderRadius:"50%",
                    transition:
                        "background-color .2s ease, transform .15s ease",
                    "&:hover":{
                        bgcolor:
                            "rgba(193,18,31,.08)",
                    },
                    "&:active":{
                        transform:
                            "scale(.96)",
                    }
                }}
            >
                <UserAvatar
                    size={40}
                />
            </IconButton>


            {/* USER MENU */}

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical:"bottom",
                    horizontal:"right"
                }}
                transformOrigin={{
                    vertical:"top",
                    horizontal:"right"
                }}
                slotProps={{
                    paper:{
                        sx:{
                            width:260,
                            mt:1.5,
                            borderRadius:3,
                            p:1,
                            boxShadow:
                                "0 12px 35px rgba(0,0,0,.18)"
                        }
                    }
                }}
            >

                {/* USER INFO */}

                <Box
                    sx={{
                        px:2,
                        py:1
                    }}
                >
                    <Typography
                        fontWeight={700}
                    >
                        {fullName}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {user?.email}
                    </Typography>

                </Box>

                <Divider
                    sx={{
                        my:1
                    }}
                />

                {/* PROFILE */}

                <MenuItem
                    onClick={()=>{
                        navigate("/profile");
                        handleClose();
                    }}
                    sx={{
                        borderRadius:2,
                    }}
                >
                    <AccountCircleOutlined
                        sx={{
                            mr:2
                        }}
                    />
                    Mi perfil
                </MenuItem>

                {/* SECURITY */}

                <MenuItem
                    onClick={()=>{
                        handleClose();
                    }}
                    sx={{
                        borderRadius:2,
                    }}
                >
                    <SecurityOutlined
                        sx={{
                            mr:2
                        }}
                    />
                    Seguridad
                </MenuItem>

                {/* THEME */}

                <MenuItem
                    onClick={()=>{
                        handleClose();
                    }}
                    sx={{
                        borderRadius:2,
                    }}
                >
                    <DarkModeOutlined
                        sx={{
                            mr:2
                        }}
                    />
                    Tema
                </MenuItem>

                <Divider
                    sx={{
                        my:1
                    }}
                />

                {/* LOGOUT */}

                <MenuItem
                    onClick={()=>{
                        logout();
                        handleClose();
                    }}
                    sx={{
                        borderRadius:2,
                        color:
                            "error.main",
                    }}
                >
                    <LogoutOutlined
                        sx={{
                            mr:2
                        }}
                    />
                    Cerrar sesión
                </MenuItem>
            </Menu>
        </Box>
    );
}