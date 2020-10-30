import Photo from '../models/Photo'

export const createPhoto = async (req, res) => {
    try{
        const { title, user } = req.body
        
        const photo = new Photo({
            title, 
            path:req.file.path,           
            user      
        })        
        const savedPhoto = await photo.save()
        return res.status(200).json({
            _id: savedPhoto._id,
            title: savedPhoto.title,
            path: savedPhoto.path,
            user: savedPhoto.user
        })
    }catch(error){
        console.log(error)
    }
}

export const getPhotos = async (req, res) => {
    const photos = await Photo.find()
    return res.json(photos)
}

