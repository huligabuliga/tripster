import express from 'express';
import { Group } from '../models/Group.js';
import { createGroup, getGroupExpenses, getGroupById, joinGroup, getGroupMembers } from '../controller/group.controller.js';

const groupRouter = express.Router();

// routes are as following:
// /api/groups/register
// /api/groups/:groupId/expenses
// /api/groups/:groupId
// /api/groups/:userId
// /api/groups/join
// /api/groups/:groupId/members

// Create a new group
groupRouter.post('/register', createGroup);

// Get group expenses
groupRouter.get('/:groupId/expenses', getGroupExpenses);

// Get group by ID
groupRouter.get('/:groupId', getGroupById);

// get groups with user id
groupRouter.get('/:userId', getGroupById);

//join group with user id and group id
groupRouter.post('/join', joinGroup);

//get group.members and the user id username
groupRouter.post('/:groupId/members', getGroupMembers);

export default groupRouter;