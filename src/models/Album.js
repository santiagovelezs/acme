import { Schema, model }  from "mongoose"

const albumSchema = new Schema({
    name: { type: String, required: true },     
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true} 
},
    {
        timestamps: true,
        versionKey: false,
    }
)

export default model('Album', albumSchema)