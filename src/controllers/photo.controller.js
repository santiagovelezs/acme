import Photo from '../models/Photo'

export const createPhoto = async (req,res) => {
    try{
        const { title, path, user} = req.body
        
        const photo = new Photo({
            title,
            path,
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

