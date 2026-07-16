import {
    Avatar,
    Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "@/store/AuthContext";


export default function UserAvatar({
    size = 38,
}) {
    const theme = useTheme();
    const { user } = useAuth();

    const initials = [
        user?.first_name,
        user?.last_name,
    ]
        .filter(Boolean)
        .map(name => name[0].toUpperCase())
        .join("") || "U";

    const fullName =
        `${user?.first_name ?? ""} ${user?.last_name ?? ""}`
            .trim() || "Usuario";

    return (

        <Tooltip
            title={fullName}
            placement="bottom"
        >

            <Avatar
                sx={{
                    width: size,
                    height: size,
                    bgcolor:
                        "primary.main",
                    color:
                        "primary.contrastText",
                    fontWeight: 800,
                    fontSize:
                        size * 0.35,
                    cursor: "pointer",
                    flexShrink: 0,
                    border:
                        `2px solid ${theme.palette.primary.main}33`,
                    boxShadow:
                        `0 6px 18px ${theme.palette.primary.main}35`,
                    transition:
                        "transform .25s ease, boxShadow .25s ease",
                    "&:hover": {
                        transform:
                            "translateY(-2px) scale(1.06)",
                        boxShadow:
                            `0 10px 28px ${theme.palette.primary.main}55`,
                    },
                }}
            >
                {initials}
            </Avatar>
        </Tooltip>
    );
}