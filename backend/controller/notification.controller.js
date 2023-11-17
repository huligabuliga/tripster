import Notification from '../models/Notification.js';

export const sendNotification = async (message, userId, groupId) => {
  try {
    const newNotification = new Notification({
      message,
      userId,
      groupId,
    });

    await newNotification.save();

  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

export const getNotificationsByUser = async (req, res) => {
    try {
      const userId = req.userId; // Asumiendo que tienes el ID del usuario en el token
      const notifications = await Notification.find({ userId });
      res.status(200).json(notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ message: 'Error fetching notifications' });
    }
  };