import { Router } from 'express'
const router = Router()

import * as photoController from '../controllers/photo.controller'
import multer from '../libs/multer'

//router.get('/', photoController.getPhotos)

router.post('/', multer.single('image'), photoController.createPhoto)

export default router