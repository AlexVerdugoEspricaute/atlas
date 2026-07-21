const { findByEmail } =
require("../modules/users/services/users.service");


const userSyncMiddleware = async(req,res,next)=>{
    try{

        const dbUser =
            await findByEmail(req.user.email);

        if(!dbUser){
            return res.status(404).json({
                message:"User not found"
            });
        }

        req.dbUser =
            dbUser;

        next();

    }catch(error){

        console.error(
            "[USER SYNC ERROR]",
            error
        );

        return res.status(500).json({
            message:"User synchronization failed"
        });
    }
};


module.exports = userSyncMiddleware;