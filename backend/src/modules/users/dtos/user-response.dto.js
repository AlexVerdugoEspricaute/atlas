class UserResponseDTO {

    constructor(user = {}) {

        this.id =
            user.id;

        this.email =
            user.email;

        this.first_name =
            user.first_name;

        this.last_name =
            user.last_name;

        this.provider =
            user.provider;

        this.is_active =
            user.is_active;

        this.role =
            user.roles
            ?
            {
                id:user.roles.id,
                name:user.roles.name
            }
            :
            null;

        this.area =
            user.areas
            ?
            {
                id:user.areas.id,
                name:user.areas.name
            }
            :
            null;
    }
}


const userDTO = (user)=>{
    if(!user){
        return null;
    }

    return new UserResponseDTO(user);
};


const usersDTO = (users = [])=>{
    return users.map(
        user=>new UserResponseDTO(user)
    );
};


module.exports = {
    UserResponseDTO,
    userDTO,
    usersDTO
};