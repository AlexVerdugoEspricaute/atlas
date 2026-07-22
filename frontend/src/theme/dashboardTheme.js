import colors from "./colors";
import shadows from "./shadows";
import typography from "./typography";
import components from "./components";


const dashboardTheme = {
    colors,
    shadows,
    typography,
    components,
    layout:{
        sidebar:{
            width:260,
            collapsed:76,
            transition:
                "width .3s cubic-bezier(.4,0,.2,1)"
        },

        header:{
            height:72,
            mobileHeight:64
        },

        content:{
            maxWidth:1440,
            padding:{
                xs:16,
                sm:24,
                md:32
            }
        }
    },

    radius:{
        small:
            "8px",
        medium:
            "12px",
        large:
            "14px",
        pill:
            "999px"
    },

    animation:{
        fast:
            ".2s cubic-bezier(.4,0,.2,1)",
        normal:
            ".35s cubic-bezier(.4,0,.2,1)",
        slow:
            ".5s cubic-bezier(.4,0,.2,1)"
    },

    effects:{
        glass:{
            blur:
                "blur(18px)",
            opacity:
                "rgba(255,255,255,.08)"
        },

        hover:{
            translate:
                "translateY(-2px)",
            scale:
                "scale(1.02)"
        },

        glow:{
            primary:
                colors.primary.glow
        }
    },

    dashboard:{
        gridGap:
            24,
        sectionSpacing:
            32,
        cardElevation:
            "medium"
    }
};


export default dashboardTheme;