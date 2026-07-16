import { Box, TextField, InputAdornment } from "@mui/material";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export default function SidebarSearch() {
    return (
        <Box
            sx={{
                px: 2,
                pb: 2,
            }}
        >
            <TextField
                fullWidth
                size="small"
                placeholder="Buscar..."
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchOutlinedIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    },
                }}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                    },
                }}
            />
        </Box>
    );
}
