const requireSelfOrAdmin = (req,res,next)=>{

    const loggedUser =
        req.dbUser;

    const requestedUserId =
        req.params.id;

    if(!loggedUser){
        return res.status(401).json({
            message:"Usuario no autenticado"
        });
    }

    if(loggedUser.roles?.name==="admin"){
        return next();
    }

    if(loggedUser.id===requestedUserId){
        return next();
    }

    return res.status(403).json({
        message:"No tienes permisos para acceder a este recurso"
    });

};

module.exports = {
    requireSelfOrAdmin
};