import { Box } from "@mui/material";
import MainLayout from "@/layouts/MainLayout";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import StatsCards from "@/components/dashboard/StatsCards";
import QuickActions from "@/components/dashboard/QuickActions";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";

export default function Dashboard() {
    return (
        <MainLayout>
            <WelcomeCard />
            <StatsCards />
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
                <QuickActions />
                <ActivityTimeline />
            </Box>
        </MainLayout>
    );
}

