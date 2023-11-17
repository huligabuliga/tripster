// Frontend - Ejemplo de un componente de notificaciones

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Consulta el backend para obtener las notificaciones del usuario actual
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/notifications');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []); // Ejecuta la consulta solo al montar el componente

  return (
    <div>
      <h3>Notifications</h3>
      <ul>
        {notifications.map(notification => (
          <li key={notification._id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
