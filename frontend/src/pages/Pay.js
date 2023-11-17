import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();
  const [isPaid, setIsPaid] = useState(false);
  const { groupId, expenseId } = useParams(); // Get the expenseId from the URL
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  console.log('currentUser:', currentUser);
  console.log('currentUser._id:', currentUser._id);
  console.log('expenseId:', expenseId)
  const handlePay = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/expenses/${expenseId}/update`, {
        //userID
        userId: currentUser._id,
        paid: true,
        evidence: imageUrl
      }).then(async response => {
        console.log('userid sent:', currentUser._id);
        console.log(response);
        const updatedExpense = await axios.get(`http://localhost:3001/api/expenses/${expenseId}`);
        console.log('Updated Expense:', updatedExpense.data);
      })
    //   navigate(`/group/${groupId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center'>
      <form onSubmit={handlePay} className='w-3/4 sm:w-1/2 lg:w-1/3 xl:w-1/4'>
        <label className='block'>
          <span className='text-gray-700'>Evidence:</span>
          <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} 
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' />
        </label>
        {!isPaid && (
          <button type="submit" className="bg-green-600 rounded-full font-semibold text-white px-12 py-2 my-2 cursor-pointer">
            Pay
          </button>
        )}
      </form>
    </div>
  );
};

export default PaymentPage;