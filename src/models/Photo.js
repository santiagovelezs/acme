import { Schema, model }  from "mongoose"

const photoSchema = new Schema({
    title: { type: String, required: true },   
    album: { type: Schema.Types.ObjectId, ref: 'Album', required: true},  
    path: { type: String, required: true }    
},
    {
        timestamps: true,
        versionKey: false,
    }
)

export default model('Photo', photoSchema)