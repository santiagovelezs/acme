import User from "../models/User"

import jwt from "jsonwebtoken"
import config from "../config"

const signUp = async (req, res) => {
    try {      
      const { 
          name, 
          email, 
          password, 
          gender, 
          birth_date, 
          city,
          photo_path } = req.body    
      const newUser = new User({
        name,
        email,
        password: await User.encryptPassword(password),
        gender,
        birth_date,
        city,
        photo_path,
        active: true
      }) 
      
      const savedUser = await newUser.save()
      
      const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
        expiresIn: '1h',
      })
  
      return res.status(200).json({ token })
    }catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  }
  
  const signIn = async (req, res) => {
    try {    
      console.log(req.body)  
      const userFound = await User.findOne({ email: req.body.email })
      console.log(userFound._id)  
      if (!userFound) 
        return res.status(400).json({ message: "User Not Found" })
  
      const matchPassword = await userFound.comparePassword(req.body.password)

      if (!matchPassword)
        return res.status(401).json({
          token: null,
          message: "Invalid Password",
        })
  
      const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: '1h'
      });
  
      res.json({ token })
    } catch (error) {
      console.log(error)
    }
  }

  module.exports = {
    signIn,
    signUp
  }  