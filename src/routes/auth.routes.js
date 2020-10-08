import { Router } from 'express'
const router = Router()

import * as authController from '../controllers/auth.controller'
import { verifySignUp } from '../middlewares/verifySignUp'

router.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, Content-Type, Accept"
    )
    next()
  })
  
  router.post("/signup",  authController.signUp)  
  router.post("/signin", authController.signIn)

  export default router;
  