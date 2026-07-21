const requireRole = (...roles)=>{
    return (req,res,next)=>{

        const userRole =
            req.dbUser?.roles?.name;

        if(!userRole){
            return res.status(403).json({
                message:"Rol no encontrado"
            });
        }

        if(!roles.includes(userRole)){
            return res.status(403).json({
                message:"No tienes permisos para esta acción"
            });
        }

        next();
    };
};

module.exports = {
    requireRole
};