import { Schema, model }  from "mongoose"

const photoSchema = new Schema({
    title: { type: String, required: true },     
    path: { type: String, required: true },   
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true} 
},
    {
        timestamps: true,
        versionKey: false,
    }
)

export default model('Photo', photoSchema)