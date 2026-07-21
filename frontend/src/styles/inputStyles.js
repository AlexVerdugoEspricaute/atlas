import colors from "@/theme/colors";

export const inputSx = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "12px",
        bgcolor: "background.paper",
        color: "text.primary",
        transition: "all .25s ease",
        "& input": {
            color: "text.primary",
        },
        "& fieldset": {
            borderColor: "divider",
        },
        "&:hover fieldset": {
            borderColor: "primary.main",
        },
        "&.Mui-focused fieldset": {
            borderColor: "primary.main",
            borderWidth: 2,
        },
    },
    "& .MuiInputLabel-root": {
        color: "text.secondary",
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "primary.main",
    },
    "& .MuiFormHelperText-root": {
        color: "text.secondary",
    },
};
