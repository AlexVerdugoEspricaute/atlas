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
            collapsed:80
        },
        header:{
            height:72
        }
    },
    animation:{
        fast:
            ".2s ease",
        normal:
            ".35s cubic-bezier(.4,0,.2,1)"
    }
};


export default dashboardTheme;