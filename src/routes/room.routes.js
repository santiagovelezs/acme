import { Router } from 'express'
const router = Router()

import * as roomController from '../controllers/rooms.controller'
import { auth, verifyRoom } from '../middlewares'

router.get('/', roomController.getRooms)

router.get('/:roomId', roomController.getRoomById)

router.post('/', 
    [auth.verifyToken, auth.isAdmin, verifyRoom.verifyDuplicateRoom],
    roomController.createRoom
)

router.put('/:roomId',
    [auth.verifyToken, auth.isAdmin],
    roomController.updateRoomById
)

router.delete('/:roomId',
    [auth.verifyToken, auth.isAdmin],
    roomController.deleteRoomById
)

export default router