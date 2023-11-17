import express from 'express'
import { User } from '../models/user.model.js'
import { deleteUser, getUserGroups, getUserInfo } from '../controller/user.controller.js';
import { verifyToken } from '../middleware/jwt.js';


const userRouter = express.Router();
// the routes are as following:
// /api/users/:userId/info
// /api/users/:userId/groups
// /api/users/:userId


// Busca a usuario por su ID
userRouter.get('/:userId/info', getUserInfo);

userRouter.delete("/:id", verifyToken,deleteUser)
userRouter.get('/:userId/groups', getUserGroups);

export default userRouter