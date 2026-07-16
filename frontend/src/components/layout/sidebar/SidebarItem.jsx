import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

export default function SidebarItem({ item, selected = false, collapsed = false }) {
    return (
        <ListItemButton
            selected={selected}
            sx={{
                mx: 1,
                mb: 0.5,
                borderRadius: "12px",
                minHeight: 46,
                transition: ".25s",
                "&.Mui-selected": {
                    background: "rgba(193,18,31,.12)",
                },
                "&.Mui-selected:hover": {
                    background: "rgba(193,18,31,.16)",
                },
                "&:hover": {
                    background: "rgba(193,18,31,.08)",
                },
            }}
        >
            <ListItemIcon
                sx={{
                    minWidth: 42,
                    color: selected ? "primary.main" : "text.secondary",
                }}
            >
                {item.icon}
            </ListItemIcon>

            {!collapsed && <ListItemText primary={item.label} />}
        </ListItemButton>
    );
}
