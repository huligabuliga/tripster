import React, { useState, useEffect } from 'react';

const UserInfo = ({ userId }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Realiza una solicitud GET al backend para obtener la información del usuario
    fetch(`/api/users/${userId}/info`)
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data); // Almacena la información del usuario en el estado del componente
      })
      .catch((error) => {
        console.error('Error al obtener información del usuario:', error);
      });
  }, [userId]);

  if (!userInfo) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Información del Usuario</h2>
      <p>Nombre de usuario: {userInfo.username}</p>
      <p>Email: {userInfo.email}</p>
      {/* Agrega más campos de información aquí si es necesario */}
    </div>
  );
};

export default UserInfo;