const normalizeEmail = (email = "") => {
    return email
        .trim()
        .toLowerCase();
};


const splitName = (fullName = "") => {
    const cleanName =
        fullName.trim();
    if(!cleanName){
        return {
            first_name:"",
            last_name:""
        };
    }

    const parts =
        cleanName.split(/\s+/);
    if(parts.length === 1){
        return {
            first_name:parts[0],
            last_name:"-"
        };
    }

    return {
        first_name:
            parts
            .slice(0,-1)
            .join(" "),
        last_name:
            parts[parts.length - 1]
    };
};



const sanitizeUser = (user = {}) => {
    const {
        password_hash,
        ...safeUser
    } = user;
    return safeUser;
};



module.exports = {
    normalizeEmail,
    splitName,
    sanitizeUser
};