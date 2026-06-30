// Por ahora vacío pero preparado para Supabase

const findAll = async () => {
    return [];
};

const findById = async (id) => {
    return null;
};

const create = async (data) => {
    return { id: "temp", ...data };
};

const update = async (id, data) => {
    return { id, ...data };
};

const remove = async (id) => {
    return true;
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};