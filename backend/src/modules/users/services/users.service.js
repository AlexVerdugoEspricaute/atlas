const usersRepository = require("../repositories/users.repository");
const supabase = require("../../../config/supabase");

const getUsers = async () => {
    return await usersRepository.findAll();
};

const getUserById = async (id) => {
    return await usersRepository.findById(id);
};

const createUser = async (data) => {
    return await usersRepository.create(data);
};

const updateUser = async (id, data) => {
    return await usersRepository.update(id, data);
};

const deleteUser = async (id) => {
    return await usersRepository.remove(id);
};

const splitName = (fullName = "") => {
    const parts = fullName.trim().split(/\s+/);

    if (parts.length === 0) {
        return {
            first_name: "",
            last_name: ""
        };
    }

    if (parts.length === 1) {
        return {
            first_name: parts[0],
            last_name: "-"
        };
    }

    return {
        first_name: parts.slice(0, -1).join(" "),
        last_name: parts.slice(-1).join(" ")
    };
};

const findOrCreateUser = async (azureUser) => {

    // Buscar usuario existente por Entra ID
    const { data: existingUser, error: findError } = await supabase
        .from("users")
        .select(`
            *,
            roles (*),
            areas (*)
        `)
        .eq("entra_id", azureUser.azureOid)
        .maybeSingle();

    if (findError) {
        throw findError;
    }

    if (existingUser) {
        return existingUser;
    }

    // Obtener rol "user"
    const { data: defaultRole, error: roleError } = await supabase
        .from("roles")
        .select("id")
        .eq("name", "user")
        .single();

    if (roleError) {
        throw roleError;
    }

    const { first_name, last_name } = splitName(azureUser.name);

    // Crear usuario
    const { data: newUser, error: insertError } = await supabase
        .from("users")
        .insert({
            entra_id: azureUser.azureOid,
            email: azureUser.email,
            first_name,
            last_name,
            role_id: defaultRole.id
        })
        .select(`
            *,
            roles (*),
            areas (*)
        `)
        .single();

    if (insertError) {
        throw insertError;
    }

    return newUser;
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    findOrCreateUser
};