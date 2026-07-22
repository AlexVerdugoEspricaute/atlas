import {
    Box,
    Grid
} from "@mui/material";

import MainLayout from "@/layouts/MainLayout";
import StatsCards from "@/components/dashboard/StatsCards";
import QuickActions from "@/components/dashboard/QuickActions";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import RecentUsersTable from "@/components/dashboard/RecentUsersTable";
import SystemStatusCard from "@/components/dashboard/SystemStatusCard";


export default function Dashboard(){
    return (
        <MainLayout title="Dashboard">
            <Box
                sx={{
                    position:"relative",
                    minHeight:"100%",
                    display:"flex",
                    flexDirection:"column",
                    gap:4,
                    "&::before":{
                        content:'""',
                        position:"absolute",
                        top:-80,
                        right:-120,
                        width:350,
                        height:350,
                        borderRadius:"50%",
                        background:
                        "radial-gradient(circle, rgba(193,18,31,.10), transparent 70%)",
                        pointerEvents:"none"
                    }
                }}
            >

                {/* METRICAS */}

                <Box
                    sx={{
                        position:"relative",
                        zIndex:1
                    }}
                >
                    <StatsCards />
                </Box>

                {/* CONTENIDO PRINCIPAL */}

                <Grid
                    container
                    spacing={3}
                    sx={{
                        position:"relative",
                        zIndex:1
                    }}
                >

                    <Grid
                        size={{
                            xs:12,
                            lg:8
                        }}
                    >
                        <DashboardCharts />
                    </Grid>

                    <Grid
                        size={{
                            xs:12,
                            lg:4
                        }}
                    >
                        <SystemStatusCard />
                    </Grid>

                    <Grid
                        size={{
                            xs:12,
                            lg:8
                        }}
                    >
                        <RecentUsersTable />
                    </Grid>

                    <Grid
                        size={{
                            xs:12,
                            lg:4
                        }}
                    >
                        <ActivityTimeline />
                    </Grid>

                    <Grid
                        size={{
                            xs:12
                        }}
                    >
                        <QuickActions />
                    </Grid>

                </Grid>
            </Box>

        </MainLayout>
    );
}