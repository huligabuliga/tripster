import express from 'express'
import { User } from '../models/user.model.js'
import { deleteUser } from '../controller/user.controller.js'
import { verifyToken } from '../middleware/jwt.js';

const userRouter = express.Router();


userRouter.delete("/:id", verifyToken,deleteUser)

export default userRouter