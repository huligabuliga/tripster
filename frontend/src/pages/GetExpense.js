import React, { useState, useEffect } from 'react';

const GroupExpenses = ({ groupId }) => {
  const [groupExpenses, setGroupExpenses] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET al backend para obtener las expenses del grupo
    fetch(`/api/groups/${groupId}/expenses`)
      .then((response) => response.json())
      .then((data) => {
        setGroupExpenses(data); // Almacena las expenses en el estado del componente
      })
      .catch((error) => {
        console.error('Error al obtener expenses del grupo:', error);
      });
  }, [groupId]);

  if (groupExpenses.length === 0) {
    return <div>No hay expenses disponibles.</div>;
  }

  return (
    <div>
      <h2>Expenses del Grupo</h2>
      <ul>
        {groupExpenses.map((expense) => (
          <li key={expense._id}>{expense.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GroupExpenses;