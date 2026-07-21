/**
 * User Interface
 *
 * Define la estructura esperada
 * de un usuario dentro del sistema.
 *
 * No ejecuta lógica.
 * Solo sirve como referencia
 * para servicios, repositorios y DTOs.
 */
const UserInterface = {
    id: null,
    email: "",
    first_name: "",
    last_name: "",
    password_hash: null,
    provider: "local",
    entra_id: null,
    role_id: null,
    area_id: null,
    is_active: true,
    created_at: null,
    updated_at: null,
};


/**
 * User Response Interface
 *
 * Datos que pueden exponerse
 * hacia frontend.
 *
 * Nunca debe incluir:
 * - password_hash
 * - tokens internos
 * - información sensible
 */
const UserResponseInterface = {
    id: null,
    email: "",
    first_name: "",
    last_name: "",
    provider: "",
    role: null,
    area: null,
    is_active: true,
    created_at: null,
};


module.exports = {
    UserInterface,
    UserResponseInterface,
};