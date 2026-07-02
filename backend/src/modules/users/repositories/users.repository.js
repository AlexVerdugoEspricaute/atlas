const supabase = require("../../../config/supabase");

// GET ALL USERS
const findAll = async () => {

    const { data, error } = await supabase
        .from("users")
        .select(`
            *,
            roles (*),
            areas (*)
        `);

    if (error) throw error;

    return data;
};

// GET USER BY ID
const findById = async (id) => {
    const { data, error } = await supabase
        .from("users")
        .select(`
            *,
            roles (*),
            areas (*)
        `)
        .eq("id", id)
        .single();

    if (error) throw error;

    return data;
};

// CREATE USER
const create = async (user) => {
    const { data, error } = await supabase
        .from("users")
        .insert([user])
        .select()
        .single();

    if (error) throw error;

    return data;
};

// UPDATE USER
const update = async (id, user) => {
    const { data, error } = await supabase
        .from("users")
        .update(user)
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    return data;
};

// DELETE USER
const remove = async (id) => {
    const { error } = await supabase
        .from("users")
        .delete()
        .eq("id", id);

    if (error) throw error;

    return true;
};

// FIND BY EMAIL
const findByEmail = async (email) => {
    const { data, error } = await supabase
        .from("users")
        .select("*, roles (*), areas (*)")
        .eq("email", email)
        .maybeSingle();

    if (error) throw error;
    return data;
};

// FIND BY ENTRA ID
const findByEntraId = async (entraId) => {
    const { data, error } = await supabase
        .from("users")
        .select("*, roles (*), areas (*)")
        .eq("entra_id", entraId)
        .maybeSingle();

    if (error) throw error;
    return data;
};

module.exports = {
    findAll,
    findById,
    findByEmail,
    findByEntraId,
    create,
    update,
    remove,
};