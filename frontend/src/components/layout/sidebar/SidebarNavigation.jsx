import { List } from "@mui/material";

import SidebarItem from "./SidebarItem";
import { sidebarItems } from "./sidebarData";

export default function SidebarNavigation({ collapsed = false }) {
    return (
        <List
            disablePadding
            sx={{
                px: 1,
            }}
        >
            {sidebarItems.map((item) => (
                <SidebarItem key={item.label} item={item} collapsed={collapsed} />
            ))}
        </List>
    );
}
