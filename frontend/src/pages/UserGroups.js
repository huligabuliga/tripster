import React, { useState, useEffect } from 'react';

const UserGroups = ({ userId }) => {
  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    fetch(`/api/users/${userId}/groups`)
      .then((response) => response.json())
      .then((data) => {
        setUserGroups(data);
      })
      .catch((error) => {
        console.error('Error al obtener grupos del usuario:', error);
      });
  }, [userId]);

  return (
    <div>
      <h2>Grupos del Usuario</h2>
      <ul>
        {userGroups.map((group) => (
          <li key={group._id}>{group.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserGroups;
