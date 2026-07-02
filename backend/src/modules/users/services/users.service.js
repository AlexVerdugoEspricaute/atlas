const usersRepository = require("../repositories/users.repository");
const supabase = require("../../../config/supabase");
const bcrypt = require("bcryptjs");

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
    findOrCreateUser,
    findByEmail,
    findOrCreateMicrosoftUser,
    loginWithCredentials,
    registerLocalUser,
};

// ─── Helpers privados ────────────────────────────────────────────────────────

async function getDefaultRoleId() {
    const { data, error } = await supabase
        .from("roles")
        .select("id")
        .eq("name", "user")
        .single();
    if (error) throw error;
    return data.id;
}

// ─── Auth: Microsoft ─────────────────────────────────────────────────────────

async function findOrCreateMicrosoftUser({ azureOid, email, name }) {
    // 1. Buscar por entra_id (usuario ya registrado con Microsoft)
    let user = await usersRepository.findByEntraId(azureOid);
    if (user) return user;

    // 2. Buscar por email (evitar duplicados si ya existe cuenta local)
    user = await usersRepository.findByEmail(email);
    if (user) {
        // Enlazar entra_id a la cuenta existente
        return await usersRepository.update(user.id, {
            entra_id: azureOid,
            provider: "microsoft",
        });
    }

    // 3. Crear nuevo usuario Microsoft
    const { first_name, last_name } = splitName(name);
    const roleId = await getDefaultRoleId();

    return await usersRepository.create({
        entra_id: azureOid,
        email,
        first_name,
        last_name,
        role_id: roleId,
        provider: "microsoft",
        is_active: true,
    });
}

// ─── Auth: Local ─────────────────────────────────────────────────────────────

async function loginWithCredentials(email, password) {
    const user = await usersRepository.findByEmail(email);

    if (!user || !user.password_hash) return null;

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return null;

    return user;
}

async function registerLocalUser({ email, password, first_name, last_name }) {
    const password_hash = await bcrypt.hash(password, 10);
    const roleId = await getDefaultRoleId();

    return await usersRepository.create({
        email,
        password_hash,
        first_name,
        last_name,
        role_id: roleId,
        provider: "local",
        is_active: true,
    });
}

// ─── Lookup ──────────────────────────────────────────────────────────────────

async function findByEmail(email) {
    return await usersRepository.findByEmail(email);
}