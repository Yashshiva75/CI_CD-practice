import express from 'express'
import {register,loginUser,deleteUser,getUsers, updateUser} from "../controller/userController.js"
import { adminOnly, protect } from '../middleware/authMiddleware.js'

const routes = express.Router()

routes.get('/getuser',protect,adminOnly,getUsers)
routes.post('/register',register)
routes.post('/login',loginUser)
routes.put('/delete/:id',adminOnly,deleteUser)
routes.put('/update/:id',adminOnly,updateUser)

export default routes;