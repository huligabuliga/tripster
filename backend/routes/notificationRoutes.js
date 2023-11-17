import express from 'express';
import { getNotificationsByUser } from '../controller/notification.controller.js';

const notificationRouter = express.Router();

notificationRouter.get('/', getNotificationsByUser);

export default notificationRouter;