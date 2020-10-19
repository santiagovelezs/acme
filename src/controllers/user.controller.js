import ROLES from '../config/roles'
import User from '../models/User'

export const createUserAdmin = async (req,res) => {
    try{
        const { name, email, password, gender, birth_date, city, photo_path } = req.body
        
        const user = new User({
            name,
            email,
            password,
            gender,
            birth_date,
            city,
            photo_path,
            role: ROLES.ADMIN
        })
        user.password = await User.encryptPassword(password)
        const savedUser = await user.save()
        return res.status(200).json({
            _id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
            role: savedUser.role
        })
    }catch(error){
        console.log(error)
    }
}

export const getUsers = async (req, res) => {
    try{
        const users = await User.find()
        if(users){
            return res.status(200).json( {
                users
            })
        }
    }catch(error){
        console.log(error)
    }
}

export const getUserById = async (req, res) => {
    try{
        const { userId } = req.params
        const user = await User.findById(userId)
        res.status(200).json({
            user
        })
    }catch(error){
        console.log(error)
    }
}

export const updateUserById = async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        {
            new: true
        }
    )
    res.status(204).json({
        updatedUser
    })
}

export const deleteUserById = async (req, res) => {
    const { userId } = req.params
    await User.findByIdAndDelete(userId)
    res.status(204).json()
}