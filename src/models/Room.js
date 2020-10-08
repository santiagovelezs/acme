import { Schema, model }  from "mongoose"
import  ROOM_TYPE  from "../config/roomTypes"
import  ROOM_STATUS  from "../config/roomStatus"

const roomSchema = new Schema({
    number: { type: String, unique: true },
    capacity: { type: Number, required: true },
    type: { type: String, required: true, enum:[ROOM_TYPE.STANDARD, ROOM_TYPE.SUPERIOR, ROOM_TYPE.SUITE]},
    rate: { type: Number, required: true },
    status: { type: String, default: ROOM_STATUS.VACANT, enum:[ROOM_STATUS.VACANT, ROOM_STATUS.OCCUPIED, ROOM_STATUS.DIRTY, ROOM_STATUS.CLEAN, ROOM_STATUS.READY, ROOM_STATUS.OUT_OF_ORDER]}
},
    {
        timestamps: true,
        versionKey: false,
    }
)

export default model('Room', roomSchema)