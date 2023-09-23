import express from 'express'
import { Group } from '../models/Group.js'
import { createGroup, getGroupExpenses } from '../controller/group.controller.js'

const groupRouter = express.Router()

// creategroup 
groupRouter.post("/group/register", createGroup )
groupRouter.get('/:groupId/expenses', getGroupExpenses)


export default groupRouter