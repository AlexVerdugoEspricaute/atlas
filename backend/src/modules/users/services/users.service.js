const usersRepository = require("../repositories/users.repository");
const supabase = require('../../../config/supabase')

const getUsers = async () => {
    const data = await usersRepository.findAll();
    return data;
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

const findOrCreateUser = async (azureUser) => {
    const { data: user } = await supabase
        .from('users')
        .select('*')
        .eq('azure_oid', azureUser.oid)
        .maybeSingle()

    if (user) return user

    const { data: newUser } = await supabase
        .from('users')
        .insert({
        azure_oid: azureUser.oid,
        email: azureUser.email,
        name: azureUser.name,
        role_id: 1
        })
        .select()
        .single()

    return newUser
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    findOrCreateUser 
};