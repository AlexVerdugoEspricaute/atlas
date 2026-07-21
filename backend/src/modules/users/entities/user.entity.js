class UserEntity {

    constructor(data = {}) {

        this.id =
            data.id || null;

        this.email =
            data.email || null;

        this.password_hash =
            data.password_hash || null;

        this.first_name =
            data.first_name || null;

        this.last_name =
            data.last_name || null;

        this.entra_id =
            data.entra_id || null;

        this.provider =
            data.provider || "local";

        this.role_id =
            data.role_id || null;

        this.is_active =
            data.is_active ?? true;

        this.created_at =
            data.created_at || null;

        this.updated_at =
            data.updated_at || null;

        this.roles =
            data.roles || null;

        this.areas =
            data.areas || null;
    }
}

module.exports = UserEntity;