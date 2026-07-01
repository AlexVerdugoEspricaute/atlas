const usersRepository = require("../repositories/users.repository");

const getUsers = async () => {
    console.log("SERVICE HIT");

    const data = await usersRepository.findAll();

    console.log("SERVICE DATA:", data);

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

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};