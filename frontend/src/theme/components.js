import colors from "./colors";
import shadows from "./shadows";

const components = {
    light:{
        card:{
            background:colors.background.paper,
            border:`1px solid ${colors.border.light}`,
            shadow:shadows.sm,
        },
    },

    dark:{
        card:{
            background:colors.background.darkPaper,
            border:`1px solid ${colors.border.dark}`,
            shadow:"0 8px 30px rgba(0,0,0,.35)",
        },
    },

    common:{
        card:{
            radius:"16px",
            transition:"all .35s cubic-bezier(.4,0,.2,1)",
        },

        button:{
            radius:"12px",
            transition:"all .25s ease",
        }
    }
};

export default components;