import MuiDrawer from "@mui/material/Drawer";

export default function Drawer({
    children,
    open = true,
    width = 240,
    variant = "permanent",
    ...props
}) {
    return (
        <MuiDrawer
            open={open}
            variant={variant}
            sx={{
                width,
                flexShrink: 0,

                "& .MuiDrawer-paper": {
                    width,
                    boxSizing: "border-box",
                },
            }}
            slotProps={{
                paper: {
                    sx: (theme) => ({
                        width,

                        boxSizing: "border-box",

                        display: "flex",
                        flexDirection: "column",

                        overflowX: "hidden",

                        backgroundColor:
                            theme.palette.background.paper,

                        borderRight:
                            `1px solid ${theme.palette.divider}`,

                        transition:
                            theme.transitions.create(
                                ["width", "background-color"],
                                {
                                    duration:
                                        theme.transitions.duration.standard,
                                }
                            ),

                        "&::-webkit-scrollbar": {
                            width: 6,
                        },

                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor:
                                theme.palette.primary.main,
                            borderRadius: 10,
                        },
                    }),
                },
            }}
            {...props}
        >
            {children}
        </MuiDrawer>
    );
}