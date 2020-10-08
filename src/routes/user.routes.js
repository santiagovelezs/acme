import { Router } from 'express'
const router = Router()

import * as userController from '../controllers/user.controller'
import { auth, verifySignUp } from '../middlewares'

router.get('/', 
    [auth.verifyToken, auth.isAdmin],
    userController.getUsers
)

router.post('/', 
    [auth.verifyToken, auth.isAdmin, verifySignUp.verifyDuplicateEmail],
    userController.createUserAdmin
)

router.put('/:userId',
    [auth.verifyToken, auth.isAdmin],
    userController.updateUserById
)

router.delete('/:userId',
    [auth.verifyToken, auth.isAdmin],
    userController.deleteUserById
)

export default router