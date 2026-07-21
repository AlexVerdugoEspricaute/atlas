class CreateUserDTO {

    constructor(data = {}) {

        this.email =
            data.email?.toLowerCase();

        this.first_name =
            data.first_name;

        this.last_name =
            data.last_name;

        this.provider =
            data.provider || "local";

        this.is_active =
            data.is_active ?? true;

        if(data.password){
            this.password =
                data.password;
        }

        if(data.role_id){
            this.role_id =
                data.role_id;
        }
    }
}

module.exports = CreateUserDTO;