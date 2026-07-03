import { Avatar, Tooltip } from "@mui/material";
import { useAuth } from "@/store/AuthContext";

export default function UserAvatar({ size = 34 }) {
    const { user } = useAuth();
    const initials = [user?.first_name, user?.last_name]
        .filter(Boolean)
        .map((n) => n[0].toUpperCase())
        .join("") || "U";

    return (
        <Tooltip title={`${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim()}>
            <Avatar
                sx={{
                    width: size,
                    height: size,
                    bgcolor: "#6E0D25",
                    fontSize: size * 0.35,
                    fontWeight: 700,
                    cursor: "pointer",
                    flexShrink: 0,
                    boxShadow: "0 0 8px rgba(110,13,37,0.25)",
                }}
            >
                {initials}
            </Avatar>
        </Tooltip>
    );
}
