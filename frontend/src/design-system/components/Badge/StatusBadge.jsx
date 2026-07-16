import { Chip } from "@mui/material";
import { colors } from "@/theme";


const STATUS = {

    active: {

        label: "Activo",

        color: colors.status.success,

    },


    inactive: {

        label: "Inactivo",

        color: colors.text.muted,

    },


    pending: {

        label: "Pendiente",

        color: colors.status.warning,

    },


    error: {

        label: "Error",

        color: colors.status.error,

    },


    info: {

        label: "Información",

        color: colors.status.info,

    }

};



export default function StatusBadge({

    status = "active",

    label,

    sx = {}

}) {


    const config =
        STATUS[status] || STATUS.active;



    return (

        <Chip

            label={
                label || config.label
            }


            size="small"


            sx={{

                height:26,


                borderRadius:"8px",


                fontWeight:600,


                fontSize:"0.75rem",


                background:
                `${config.color}18`,


                color:
                config.color,


                border:
                `1px solid ${config.color}35`,


                ...sx

            }}

        />

    );

}