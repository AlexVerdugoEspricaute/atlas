import SidebarSearch from "@src/components/layout/sidebar/SidebarSearch";
import SidebarNavigation from "@src/components/layout/sidebar/SidebarNavigation";
import SidebarHeader from "@src/components/layout/sidebar/SidebarHeader";
import SidebarFooter from "@src/components/layout/sidebar/SidebarFooter";

import { Drawer } from "@design-system";


export default function Sidebar(props) {

    return (
        <Drawer
            {...props}
        >

            <SidebarHeader />

            <SidebarSearch />

            <SidebarNavigation />

            <SidebarFooter />

        </Drawer>
    );
}