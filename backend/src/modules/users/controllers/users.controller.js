const usersService = require("../services/users.service");

const getUsers = async (req, res) => {
    const users = await usersService.getUsers();

    res.json({ success: true, data: users });
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await usersService.getUserById(id);

    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, data: user });
};

const createUser = async (req, res) => {
    const user = await usersService.createUser(req.body);
    res.status(201).json({ success: true, data: user });
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const user = await usersService.updateUser(id, req.body);

    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, data: user });
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const deleted = await usersService.deleteUser(id);

    if (!deleted) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User deleted successfully" });
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};