const supabase = require("../../../config/supabase");

// GET ALL USERS
const findAll = async () => {
    console.log("REPOSITORY HIT");

    const { data, error } = await supabase
        .from("users")
        .select(`
            *,
            roles (*),
            areas (*)
        `);

    console.log("SUPABASE RAW DATA:", data);
    console.log("SUPABASE ERROR:", error);

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

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};