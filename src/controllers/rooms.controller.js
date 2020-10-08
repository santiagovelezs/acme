import Room from '../models/Room'

export const createRoom = async (req,res) => {
    try{
        const { number, capacity, type, rate, status } = req.body
        
        const room = new Room({
            number,
            capacity,
            type,
            rate,
            status       
        })        
        const savedRoom = await room.save()
        return res.status(200).json({
            _id: savedRoom._id,
            number: savedRoom.number,
            capacity: savedRoom.capacity,
            type: savedRoom.type,
            rate: savedRoom.rate,
            status: savedRoom.status
        })
    }catch(error){
        console.log(error)
    }
}

export const getRooms = async (req, res) => {
    try{
        const rooms = await Room.find()
        if(rooms){
            return res.status(200).json( {
                rooms
            })
        }
    }catch(error){
        console.log(error)
    }
}

export const getRoomById = async (req, res) => {
    try{
        const { roomId } = req.params
        const room = await Room.findById(roomId)
        res.status(200).json({
            room
        })
    }catch(error){
        console.log(error)
    }
}

export const updateRoomById = async (req, res) => {
    const updatedRoom = await Room.findByIdAndUpdate(
        req.params.RoomId,
        req.body,
        {
            new: true
        }
    )
    res.status(204).json({
        updatedRoom
    })
}

export const deleteRoomById = async (req, res) => {
    const { roomId } = req.params
    await Room.findByIdAndDelete(roomId)
    res.status(204).json()
}