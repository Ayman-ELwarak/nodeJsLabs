const UserService = require("../services/users");
const APIError = require("../utils/APIError");

const createUser = async (req, res) => {
    const user = await UserService.createUser(req.body);
    res.status(201).json({ message: "User created successfully", data: user });
}

const getAllUsers = async (req, res) => {
    const {users, pagenation} = await UserService.getAllUsers(req.query);
    res.json({
        message: "Users fetched successfully", 
        data: users, 
        pagenation: pagenation
    })
}

const getUserById = async (req, res) =>{
    const {id} = req.params;
    const user = await UserService.getUserById(id);
    if(!user){
        throw new APIError("User not found", 404);
    }

    res.json({ message: "User fetched successfully", data: user });
}

const updateUser = async (req, res) => {
    const {id} = req.params;
    
    const updatedUser = await UserService.updateUser(id, req.body);
    if(!updatedUser){
        return res.status(404).json({ message: "User not found" })
    }
    res.json({ message: "User updated successfully", data: updatedUser });
}

const deleteUser = async (req, res) =>{ 
    const {id} = req.params;

    const deletedUser = await UserService.deleteUser(id);

    if(!deletedUser){
        return res.status(404).json({ message: "User not found" })
    }

     res.json({ message: "User deleted successfully" });
}

module.exports = {createUser, getAllUsers, getUserById, updateUser, deleteUser};