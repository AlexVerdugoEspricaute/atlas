class UpdateUserDTO {

    constructor(data = {}) {

        if(data.first_name){
            this.first_name =
                data.first_name;
        }

        if(data.last_name){
            this.last_name =
                data.last_name;
        }

        if(data.email){
            this.email =
                data.email.toLowerCase();
        }

        if(data.is_active !== undefined){
            this.is_active =
                data.is_active;
        }

        if(data.role_id){
            this.role_id =
                data.role_id;
        }
    }
}

module.exports = UpdateUserDTO;