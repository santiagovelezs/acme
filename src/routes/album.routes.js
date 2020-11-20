import { Router } from 'express'
const router = Router()

import * as albumController from '../controllers/album.controller'

router.post('/', albumController.createAlbum)
router.get('/', albumController.getAlbums)

export default router