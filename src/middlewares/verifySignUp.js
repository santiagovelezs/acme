import User from "../models/User"

const verifyDuplicateEmail = async (req, res, next) => {
    try{
        const user = await User.findOne( { email: req.body.email })
        if(user){
            return res.status(400).json({ message: "User already exists"})
        }
        next()
    }catch(error){
        res.status(500).json({ message: error })
    }
}

export { verifyDuplicateEmail }