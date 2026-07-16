import colors from "@/theme/colors";

export const inputSx = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "12px",
        backgroundColor: colors.background.paper,
        transition: "all 0.2s ease",

        "& fieldset": {
            borderColor: colors.border.light,
        },

        "&:hover fieldset": {
            borderColor: colors.primary.main,
        },

        "&.Mui-focused fieldset": {
            borderColor: colors.primary.main,
            borderWidth: "2px",
        },
    },

    "& .MuiInputLabel-root.Mui-focused": {
        color: colors.primary.main,
        fontWeight: 500,
    },
};