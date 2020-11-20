import Album from '../models/Album'
import jwt from "jsonwebtoken"
import config from "../config"

export const createAlbum = async (req, res) => {
    try{        
        const { name, token } = req.body        
        const decoded = jwt.verify(token, config.SECRET)
        let userID = decoded.id      
               
        const Newalbum = new Album({
            name,             
            user:userID                  
        })        
        const savedAlbum = await Newalbum.save()
        return res.status(200).json({
            _id: savedAlbum._id,
            name: savedAlbum.name          
        })
    }catch(error){
        console.log(error)
        return res.status(401).send()
    }
}

export const getAlbums = async (req, res) => {
    const  token = req.header('Authorization')
    const decoded = jwt.verify(token, config.SECRET)
    let userID = decoded.id
    const albums = await Album.find( {user: userID} )
    return res.json(albums)
}