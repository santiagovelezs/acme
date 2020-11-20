import Photo from '../models/Photo'
import jwt from "jsonwebtoken"
import config from "../config"
import Album from '../models/Album'

export const createPhoto = async (req, res) => {
    try{        
        const { title, album, token } = req.body
        const decoded = jwt.verify(token, config.SECRET)
        let userID = decoded.id
        let albumID = await Album.findOne({ name: album, user: userID})
        console.log("AlbumIDDDDDDDDDD: ",albumID)
        if(!albumID)
        {
            console.log("Crear Album")
            const NewAlbum = new Album({
                title: album,
                user: userID
            })
            const savedAlbum = await NewAlbum.save()
            albumID = savedAlbum._id
        }   
        console.log("AlbumIDDDDDDDDDD: ",albumID)         
        const photo = new Photo({
            title, 
            album: albumID,
            path:req.file.path                  
        })        
        const savedPhoto = await photo.save()
        return res.status(200).json({
            _id: savedPhoto._id,
            title: savedPhoto.title,
            path: savedPhoto.path,
            album: savedPhoto.album
        })
    }catch(error){
        console.log(error)
        return res.status(401).send()
    }
}

export const getPhotos = async (req, res) => {
    const photos = await Photo.find().populate({
        path: 'album',
        populate: {
            path: 'user'
        }
    })
    return res.json(photos)
}






