import Room from "../models/Room"

const verifyDuplicateRoom = async (req, res, next) => {
    try{
        const room = await Room.findOne( { number: req.body.number })
        if(room){
            return res.status(400).json({ message: "Room number already exists"})
        }
        next()
    }catch(error){
        res.status(500).json({ message: error })
    }
}

export { verifyDuplicateRoom }