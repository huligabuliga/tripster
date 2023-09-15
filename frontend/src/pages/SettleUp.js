import React from 'react';
// // css file 
// import './SettleUp.css';

const SettleUp = () => {
  const transactions = [
    { payer: 'Alice', payee: 'Bob', amount: 10 },
    { payer: 'Alice', payee: 'Charlie', amount: 20 },
    { payer: 'Bob', payee: 'Alice', amount: 5 },
    { payer: 'Charlie', payee: 'Alice', amount: 15 },
  ];

  const balances = {};

  transactions.forEach((transaction) => {
    const { payer, payee, amount } = transaction;

    if (!balances[payer]) {
      balances[payer] = 0;
    }

    if (!balances[payee]) {
      balances[payee] = 0;
    }

    balances[payer] -= amount;
    balances[payee] += amount;
  });

  const settleUp = () => {
    // TODO: Implement settle up logic
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Settle Up</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Balance</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(balances).map(([name, balance]) => (
            <tr key={name}>
              <td className="border px-4 py-2">{name}</td>
              <td className={`border px-4 py-2 ${balance < 0 ? 'text-red-500' : 'text-green-500'}`}>{balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={settleUp}>Settle Up</button>
    </div>
  );
};

export default SettleUp;