import { Box, Typography } from "@mui/material";


export default function Section({
    title,
    subtitle,
    children,
    sx = {}
}) {

    return (
        <Box
            sx={{
                width:"100%",
                mb:4,
                ...sx
            }}
        >
            {
                title && (
                    <Box
                        sx={{
                            mb:2
                        }}
                    >
                        <Typography
                            variant="h6"
                            fontWeight={800}
                            sx={{
                                letterSpacing:"-0.02em"
                            }}
                        >
                            {title}
                        </Typography>
                        {
                            subtitle && (
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        mt:.5
                                    }}
                                >
                                    {subtitle}
                                </Typography>
                            )
                        }
                    </Box>
                )
            }
            {children}
        </Box>
    );
};