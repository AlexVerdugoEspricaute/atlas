export const inputSx = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "12px",
        backgroundColor: "#fff",
        transition: "all 0.2s ease",

        "& fieldset": {
            borderColor: "#E5E7EB",
        },

        "&:hover fieldset": {
            borderColor: "#6E0D25",
        },

        "&.Mui-focused fieldset": {
            borderColor: "#6E0D25",
            borderWidth: "2px",
        },
    },

    "& .MuiInputLabel-root.Mui-focused": {
        color: "#6E0D25",
        fontWeight: 500,
    },
};