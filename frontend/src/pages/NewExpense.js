import React, { useState } from 'react';
import axios from 'axios';
// css file 
// import './NewExpense.css';

const NewExpense = () => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [currency, setCurrency] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [payer, setPayer] = useState('');
  const [payees, setPayees] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/expenses', {
        name,
        categories,
        currency,
        totalAmount,
        payer,
        payees,
      });

      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">New Expense</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-bold mb-2">Name:</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="categories" className="block font-bold mb-2">Categories:</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            id="categories"
            value={categories}
            onChange={(event) => setCategories(event.target.value.split(','))}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="currency" className="block font-bold mb-2">Currency:</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            id="currency"
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="totalAmount" className="block font-bold mb-2">Total Amount:</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded"
            id="totalAmount"
            value={totalAmount}
            onChange={(event) => setTotalAmount(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="payer" className="block font-bold mb-2">Payer:</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            id="payer"
            value={payer}
            onChange={(event) => setPayer(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="payees" className="block font-bold mb-2">Payees:</label>
          <select
            className="w-full px-3 py-2 border rounded"
            id="payees"
            value={payees}
            onChange={(event) => setPayees(Array.from(event.target.selectedOptions, option => option.value))}
            multiple
          >
            <option value="Alice">Alice</option>
            <option value="Bob">Bob</option>
            <option value="Charlie">Charlie</option>
            <option value="Dave">Dave</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
      </form>
    </div>
  );
};

export default NewExpense;