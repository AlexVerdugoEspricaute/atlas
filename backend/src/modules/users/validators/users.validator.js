const { z } = require("zod");


// Crear usuario
const createUserSchema = z.object({
    email:
        z.string()
        .email("Email inválido"),
    password:
        z.string()
        .min(
            8,
            "La contraseña debe tener mínimo 8 caracteres"
        )
        .optional(),
    first_name:
        z.string()
        .min(
            2,
            "Nombre demasiado corto"
        ),
    last_name:
        z.string()
        .min(
            2,
            "Apellido demasiado corto"
        )
});


// Actualizar usuario
const updateUserSchema = z.object({
    email:
        z.string()
        .email()
        .optional(),
    first_name:
        z.string()
        .min(2)
        .optional(),
    last_name:
        z.string()
        .min(2)
        .optional(),
    is_active:
        z.boolean()
        .optional(),
    role_id:
        z.string()
        .uuid()
        .optional()
});



// Middleware CREATE
const validateCreateUser = (req,res,next)=>{
    const result =
        createUserSchema.safeParse(
            req.body
        );
    if(!result.success){
        return res.status(400).json({
            success:false,
            errors:
            result.error.errors.map(
                e=>({
                    field:e.path[0],
                    message:e.message
                })
            )
        });
    }
    req.body = result.data;
    next();
};


// Middleware UPDATE
const validateUpdateUser = (req,res,next)=>{
    const result =
        updateUserSchema.safeParse(
            req.body
        );
    if(!result.success){
        return res.status(400).json({
            success:false,
            errors:
            result.error.errors.map(
                e=>({
                    field:e.path[0],
                    message:e.message
                })
            )
        });
    }
    req.body=result.data;
    next();
};


module.exports={
    validateCreateUser,
    validateUpdateUser
};