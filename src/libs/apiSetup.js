import User from "../models/User"
import ROLES from "../config/roles"

import bcrypt from "bcryptjs"

export const createAdmin = async () => {
    try{
        const user = await User.findOne({ email: 'admin@acmehotels' })

        if(!user){
            await User.create({
                name: "admin",
                email: "admin@acmehotels",
                password: await bcrypt.hash('secret', 10),
                role: ROLES.ADMIN,
                birth_date: "1900-01-01"
            })
            console.log('Admin was created')
        }
        else{
            console.log('ACME Admin: admin@acmehotels')
        }
    }catch(error){
        console.log(error)
    }
}

export const createCommonUser = async () => {
    try{
        const user = await User.findOne({ email: 'user@test' })

        if(!user){
            await User.create({
                name: "Test",
                email: "user@test",
                password: await bcrypt.hash('secret', 10),
                role: ROLES.USER,
                birth_date: "1900-01-01"
            })
            console.log('User was created')
        }
        else{
            console.log('User: user@test')
        }
    }catch(error){
        console.log(error)
    }
}