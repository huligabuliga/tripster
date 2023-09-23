import express from 'express'
import { User } from '../models/user.model.js'
import { deleteUser, getUserGroups, getUserInfo } from '../controller/user.controller.js';
import { verifyToken } from '../middleware/jwt.js';


const userRouter = express.Router();

// Busca a usuario por su ID
userRouter.get('/users/:userId/info', getUserInfo);

userRouter.delete("/:id", verifyToken,deleteUser)
userRouter.get('/users/:userId/groups', getUserGroups);

export default userRouter