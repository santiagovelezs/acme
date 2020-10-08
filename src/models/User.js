import { Schema, model }  from "mongoose"
import bcrypt from "bcryptjs"
import  ROLES from "../config/roles"

const userSchema = new Schema({
    name: {type: String, required : true},
    email: {type: String, unique: true, lowercase: true},
    password: {type: String, required: true},
    gender: {type: String},
    birth_date: {type: Date, required: true},
    city: {type: String},
    photo_path: {type: String},
    active: {type: Boolean, default: true},
    role: {type: String, default: ROLES.USER, enum:[ROLES.USER, ROLES.ADMIN]}
},
    {
        timestamps: true,
        versionKey: false,
    }
)

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

userSchema.methods.comparePassword = async function(receivedPassword){
    return await bcrypt.compare(receivedPassword, this.password)
}

module.exports = model('User', userSchema) 