import express from 'express'
import { Group } from '../models/Group.js'
import { createGroup } from '../controller/group.controller.js'

const groupRouter = express.Router()

// creategroup 
groupRouter.post("/group/register", createGroup )


export default groupRouter