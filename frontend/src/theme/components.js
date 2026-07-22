import colors from "./colors";
import shadows from "./shadows";

const components = {

    light:{
    
        card:{
            background:
                colors.background.paper,
            surface:
                colors.background.surfaceLight,
            border:
                `1px solid ${colors.border.light}`,
            shadow:
                shadows.sm,
            hoverShadow:
                shadows.md,
        },

        modal:{
            background:
                colors.background.paper,
            border:
                `1px solid ${colors.border.light}`,
            shadow:
                shadows.lg,
        },

        menu:{
            background:
                colors.background.paper,
            border:
                `1px solid ${colors.border.light}`,
            shadow:
                shadows.md,
        },

        input:{
            background:
                colors.background.paper,
            border:
                `1px solid ${colors.border.light}`,
            focusBorder:
                colors.primary.main,
        },
    },

    dark:{
        card:{
            background:
                colors.background.darkPaper,
            surface:
                colors.background.surfaceDark,
            border:
                `1px solid ${colors.border.dark}`,
            shadow:
                "0 12px 35px rgba(0,0,0,.45)",
            hoverShadow:
                "0 20px 45px rgba(0,0,0,.55)",
        },

        modal:{
            background:
                colors.background.darkPaper,
            border:
                `1px solid ${colors.border.dark}`,
            shadow:
                "0 25px 70px rgba(0,0,0,.65)",
        },

        menu:{
            background:
                colors.background.darkPaper,
            border:
                `1px solid ${colors.border.dark}`,
            shadow:
                "0 20px 50px rgba(0,0,0,.55)",
        },

        input:{
            background:
                colors.background.surfaceDark,
            border:
                `1px solid ${colors.border.dark}`,
            focusBorder:
                colors.primary.light,
        },
    },

    common:{

        card:{
            radius:
                "14px",
            transition:
                "all .3s cubic-bezier(.4,0,.2,1)",
            padding:
                "24px",
        },

        button:{
            radius:
                "10px",
            transition:
                "all .25s ease",
        },

        menuItem:{
            radius:
                "10px",
            transition:
                "background .2s ease,color .2s ease",
        },

        input:{
            radius:
                "10px",
            transition:
                "border .2s ease, box-shadow .2s ease",
        },

        glass:{
            blur:
                "blur(18px)",
            background:
                colors.effects.glassLight,
        },
    }
};

export default components;