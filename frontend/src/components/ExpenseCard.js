import React, { useEffect, useState } from 'react'
import axios from 'axios';

const ExpenseCard = ({ expense, userId }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [userShare, setUserShare] = useState(0);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/users/${expense.payer}/info`);
          setUserInfo(response.data);
        } catch (err) {
          console.error(err);
        }
      };
    
      const findUserShare = () => {
        const userPayee = expense.payees.find(payee => payee._id === currentUser._id);
        console.log('userId:', userId);
        console.log("userPayee: ", userPayee);
        if (userPayee) {
          console.log("userPayee.shareAmount: ", userPayee.shareAmount);
          setUserShare(userPayee.shareAmount);
        }
      };
    
      console.log("expense: ", expense);
      fetchUserInfo();
      if (expense && expense.payees) {
        findUserShare();
      }
    }, [expense, userId]);

  return (
    <div className='flex flex-wrap w-3/4 sm:w-4/5 align-center justify-between rounded-xl m-4 p-2 shadow-xl'>
        <div className='flex flex-col justify-center w-1/4 sm:w-1/5'>
            <p className='text-xs sm:text-sm text-center'>
                15/09/2023
            </p>
        </div>
        <div className='w-1/2 mx-1'>
            <h2 className='font-bold text-xl mt-2'>{ expense.name }</h2>
            <p className='font-normal text-base mt-2'>{expense.totalAmount + ' ' + expense.currency} paid by {userInfo ? userInfo.username : 'Loading...'}</p>
        </div>
        <div className='w-1/5 flex flex-col justify-center text-center'>
            <p className='text-xs sm:text-sm'>You owe:</p>
            <p className='text-xs sm:text-sm font-semibold'>{userShare}</p>
        </div>
    </div>
  )
}

export default ExpenseCard