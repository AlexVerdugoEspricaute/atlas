const usersService = require("../services/users.service");


const getUsers = async(req,res,next)=>{
    try{
        const users =
            await usersService.getUsers();
        res.json({
            success:true,
            data:users
        });
    }catch(error){
        next(error);
    }
};


const getUserById = async(req,res,next)=>{
    try{
        const {
            id
        } = req.params;
        const user =
            await usersService.getUserById(id);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"Usuario no encontrado"
            });
        }
        res.json({
            success:true,
            data:user
        });
    }catch(error){
        next(error);
    }
};


const getMyProfile = async(req,res,next)=>{
    try{
        const user =
            await usersService.getUserById(
                req.user.id
            );
        if(!user){
            return res.status(404).json({
                success:false,
                message:"Usuario no encontrado"
            });
        }
        res.json({
            success:true,
            data:user
        });
    }catch(error){
        next(error);
    }
};


const createUser = async(req,res,next)=>{
    try{
        const user =
            await usersService.createUser(
                req.body
            );
        res.status(201).json({
            success:true,
            data:user
        });
    }catch(error){
        next(error);
    }
};


const updateUser = async(req,res,next)=>{
    try{
        const {
            id
        } = req.params;
        const user =
            await usersService.updateUser(
                id,
                req.body
            );
        if(!user){
            return res.status(404).json({
                success:false,
                message:"Usuario no encontrado"
            });
        }
        res.json({
            success:true,
            data:user
        });
    }catch(error){
        next(error);
    }
};


const updateMyProfile = async(req,res,next)=>{
    try{
        const user =
            await usersService.updateUser(
                req.user.id,
                req.body
            );
        if(!user){
            return res.status(404).json({
                success:false,
                message:"Usuario no encontrado"
            });
        }
        res.json({
            success:true,
            data:user
        });
    }catch(error){
        next(error);
    }
};


const updateMyPassword = async(req,res,next)=>{
    try{
        const user =
            await usersService.updatePassword(
                req.user.id,
                req.body
            );
        if(!user){
            return res.status(400).json({
                success:false,
                message:"No fue posible cambiar contraseña"
            });
        }
        res.json({
            success:true,
            message:"Contraseña actualizada correctamente"
        });
    }catch(error){
        next(error);
    }
};


const deleteUser = async(req,res,next)=>{
    try{
        const {
            id
        } = req.params;
        const deleted =
            await usersService.deleteUser(
                id,
                req.user.id
            );
        res.json({
            success:true,
            message:"Usuario desactivado correctamente",
            data:deleted
        });
    }catch(error){
        next(error);
    }
};


module.exports={
    getUsers,
    getUserById,
    getMyProfile,
    createUser,
    updateUser,
    updateMyProfile,
    updateMyPassword,
    deleteUser
};