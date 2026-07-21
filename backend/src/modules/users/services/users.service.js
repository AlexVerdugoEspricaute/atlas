const usersRepository = require("../repositories/users.repository");

const {
    userDTO,
    usersDTO
} = require("../dtos/user-response.dto");

const bcrypt = require("bcryptjs");


// ─────────────────────────────────────
// CRUD USERS
// ─────────────────────────────────────
const getUsers = async()=>{
    const users =
        await usersRepository.findAll();
    return usersDTO(users);
};


const getUserById = async(id)=>{
    const user =
        await usersRepository.findById(id);
    return userDTO(user);
};


const createUser = async(data)=>{

    const existingUser =
        await usersRepository.findByEmail(
            data.email.toLowerCase().trim()
        );
    if(existingUser){
        throw new Error("El correo ya está registrado");
    }

    const newUser = {
        email:
            data.email.toLowerCase().trim(),
        first_name:
            data.first_name.trim(),
        last_name:
            data.last_name.trim(),
        provider:
            "local",
        is_active:
            true,
        role_id:
            await getDefaultRoleId()
    };
    if(data.password){
        newUser.password_hash =
            await bcrypt.hash(
                data.password,
                10
            );
    }

    const user =
        await usersRepository.create(
            newUser
        );
    return userDTO(user);
};


const updateUser = async(id,data)=>{

    const allowedData = {};
    if(typeof data.first_name==="string"){
        allowedData.first_name =
            data.first_name.trim();
    }
    if(typeof data.last_name==="string"){
        allowedData.last_name =
            data.last_name.trim();
    }
    if(typeof data.email==="string"){
        const email =
            data.email.toLowerCase().trim();
        const existingUser =
            await usersRepository.findByEmail(
                email
            );
        if(
            existingUser &&
            existingUser.id!==id
        ){
            throw new Error("El correo ya está registrado");
        }
        allowedData.email =
            email;
    }
    if(Object.keys(allowedData).length===0){
        throw new Error("No hay campos válidos para actualizar");
    }
    const user =
        await usersRepository.update(
            id,
            allowedData
        );
    return userDTO(user);
};


const deleteUser = async(id,loggedUserId)=>{
    if(id===loggedUserId){
        throw new Error("No puedes desactivar tu propia cuenta");
    }
    return await usersRepository.deactivate(id);
};


// ─────────────────────────────────────
// HELPERS
// ─────────────────────────────────────
const splitName = (fullName="")=>{
    const parts =
        fullName.trim().split(/\s+/);
    if(parts.length===0){
        return {
            first_name:"",
            last_name:""
        };
    }
    if(parts.length===1){
        return {
            first_name:parts[0],
            last_name:"-"
        };
    }
    return {
        first_name:
            parts.slice(0,-1).join(" "),
        last_name:
            parts.slice(-1).join(" ")
    };
};


// ─────────────────────────────────────
// MICROSOFT AUTH
// ─────────────────────────────────────
const findOrCreateMicrosoftUser = async({azureOid,email,name})=>{
    let user =
        await usersRepository.findByEntraId(
            azureOid
        );
    if(user){
        return userDTO(user);
    }
    user =
        await usersRepository.findByEmail(
            email
        );
    if(user){
        const updated =
            await usersRepository.update(
                user.id,
                {
                    entra_id:azureOid,
                    provider:"microsoft"
                }
            );
        return userDTO(updated);
    }

    const {
        first_name,
        last_name
    } =
    splitName(name);

    const roleId =
        await getDefaultRoleId();

    const newUser =
        await usersRepository.create({
            entra_id:azureOid,
            email,
            first_name,
            last_name,
            role_id:roleId,
            provider:"microsoft",
            is_active:true
        });
    return userDTO(newUser);
};


// ─────────────────────────────────────
// LOCAL LOGIN
// ─────────────────────────────────────
const loginWithCredentials = async(email,password)=>{
    const user =
        await usersRepository.findAuthUserByEmail(
            email
        );
    if(
        !user ||
        !user.password_hash
    ){
        return null;
    }

    const valid =
        await bcrypt.compare(
            password,
            user.password_hash
        );
    if(!valid){
        return null;
    }
    return userDTO(user);
};


// ─────────────────────────────────────
// REGISTER LOCAL
// ─────────────────────────────────────
const registerLocalUser = async({
    email,
    password,
    first_name,
    last_name
})=>{
    email =
        email.toLowerCase().trim();

    const existingUser =
        await usersRepository.findByEmail(
            email
        );

    if(existingUser){
        throw new Error("El correo ya está registrado");
    }

    const password_hash =
        await bcrypt.hash(
            password,
            10
        );

    const roleId =
        await getDefaultRoleId();

    const user =
        await usersRepository.create({
            email,
            password_hash,
            first_name:first_name.trim(),
            last_name:last_name.trim(),
            role_id:roleId,
            provider:"local",
            is_active:true
        });

    return userDTO(user);
};


// ─────────────────────────────────────
// PRIVATE
// ─────────────────────────────────────
async function getDefaultRoleId(){
    return await usersRepository.getDefaultRoleId();
};


// ─────────────────────────────────────
// LOOKUP
// ─────────────────────────────────────
const findByEmail = async(email)=>{
    return await usersRepository.findByEmail(email);
};


module.exports={
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    findOrCreateMicrosoftUser,
    loginWithCredentials,
    registerLocalUser,
    findByEmail
};