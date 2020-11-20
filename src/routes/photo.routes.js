import { Router } from 'express'
const router = Router()

import * as photoController from '../controllers/photo.controller'
import multer from '../libs/multer'

router.post('/', multer.single('image'), photoController.createPhoto)
router.get('/', photoController.getPhotos)

export default router