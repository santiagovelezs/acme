import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../models/User'
import  ROLES from "../config/roles"

export const verifyToken = async (req, res, next) => {    
    try{
        const token = req.headers["authorization"]

        console.log(token)

        if(!token) 
            return res.status(403).json({message: "No token provided"})
        
        const decoded = jwt.verify(token, config.SECRET)    
        req.userId = decoded.id

        const user = await User.findById(req.userId, {password: 0})
        if(!user)
            return res.status(404).json({message: 'User not found'})

        next()
    }catch(error){
        return res.status(401).json({message: "unauthorized"})
    }    
}

export const isAdmin = async (req, res, next) => {
    try{
        const user = await User.findById(req.userId);
        if(user.role === ROLES.ADMIN){
            next()
            return
        }
        return res.status(403).json({ message: "Forbidden"})
    }catch(error){
        console.log(error)
        return res.status(500).send({ message: error })
    }
}