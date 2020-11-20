import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import roomRoutes from './routes/room.routes'
import photoRoutes from './routes/photo.routes'
import albumRoutes from './routes/album.routes'
import { createAdmin, createCommonUser } from './libs/apiSetup'

const app = express()
createAdmin()
createCommonUser()

app.set("port", process.env.PORT || 3000)

app.use(cors())
app.use(morgan('dev'))
app.use(helmet())
app.use(express.json());

app.get('/', (req, res) => {
    res.json('welcome to the ACME API')
})

// Routes
app.use("/acme/api/auth", authRoutes)
app.use("/acme/api/users", userRoutes)
app.use("/acme/api/rooms", roomRoutes)
app.use("/acme/api/photos", photoRoutes)
app.use("/uploads", express.static(path.resolve('uploads')))
app.use("/acme/api/albums", albumRoutes)

export default app