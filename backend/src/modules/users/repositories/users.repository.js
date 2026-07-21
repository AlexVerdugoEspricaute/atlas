const supabase = require("../../../config/supabase");


const USER_LIST_FIELDS = `
    id,
    first_name,
    last_name,
    provider,
    is_active,
    roles(id,name),
    areas(id,name)
`;

const USER_PROFILE_FIELDS = `
    id,
    email,
    first_name,
    last_name,
    provider,
    is_active,
    created_at,
    updated_at,
    roles(id,name),
    areas(id,name)
`;

const USER_AUTH_FIELDS = `
    id,
    email,
    password_hash,
    first_name,
    last_name,
    provider,
    entra_id,
    role_id,
    is_active,
    roles(id,name),
    areas(id,name)
`;


// GET ALL USERS
const findAll = async()=>{
    const {
        data,
        error
    } = await supabase
        .from("users")
        .select(USER_LIST_FIELDS)
        .eq("is_active",true);
    if(error) throw error;
    return data;
};


// GET USER BY ID
const findById = async(id)=>{
    const {
        data,
        error
    } = await supabase
        .from("users")
        .select(USER_PROFILE_FIELDS)
        .eq("id",id)
        .single();
    if(error) throw error;
    return data;
};


// CREATE USER
const create = async(user)=>{
    const {
        data,
        error
    } = await supabase
        .from("users")
        .insert([user])
        .select(USER_PROFILE_FIELDS)
        .single();
    if(error) throw error;
    return data;
};


// UPDATE USER
const update = async(id,user)=>{
    const {
        data,
        error
    } = await supabase
        .from("users")
        .update(user)
        .eq("id",id)
        .select(USER_PROFILE_FIELDS)
        .single();
    if(error) throw error;
    return data;
};


// DEACTIVATE USER
const deactivate = async(id)=>{
    const {
        data,
        error
    } = await supabase
        .from("users")
        .update({
            is_active:false
        })
        .eq("id",id)
        .select(USER_PROFILE_FIELDS)
        .single();
    if(error) throw error;
    return data;
};


// BUSCAR USUARIO POR EMAIL
const findByEmail = async(email)=>{
    const {
        data,
        error
    } = await supabase
        .from("users")
        .select(USER_PROFILE_FIELDS)
        .eq("email",email)
        .maybeSingle();
    if(error) throw error;
    return data;
};


// BUSCAR USUARIO PARA LOGIN
const findAuthUserByEmail = async(email)=>{
    const {
        data,
        error
    } = await supabase
        .from("users")
        .select(USER_AUTH_FIELDS)
        .eq("email",email)
        .eq("is_active",true)
        .maybeSingle();
    if(error) throw error;
    return data;
};


// BUSCAR POR ENTRA ID
const findByEntraId = async(entraId)=>{
    const {
        data,
        error
    } = await supabase
        .from("users")
        .select(USER_AUTH_FIELDS)
        .eq("entra_id",entraId)
        .eq("is_active",true)
        .maybeSingle();
    if(error) throw error;
    return data;
};


const getDefaultRoleId = async()=>{
    const {
        data,
        error
    } = await supabase
        .from("roles")
        .select("id")
        .eq("name","user")
        .single();
    if(error) throw error;
    return data.id;
};


module.exports = {
    findAll,
    findById,
    findByEmail,
    findAuthUserByEmail,
    findByEntraId,
    create,
    update,
    deactivate,
    getDefaultRoleId
};