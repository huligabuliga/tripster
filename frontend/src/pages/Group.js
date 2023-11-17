import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ExpenseCard from '../components/ExpenseCard'
import '../cftools.css';

const Group = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        console.log(groupId);
        const response = await fetch(`http://localhost:3001/api/groups/${groupId}`);
        const data = await response.json();
        console.log(data);
        setGroup(data);
      } catch (error) {
        console.error('Error fetching group:', error);
      }
    };

    fetchGroup();
  }, [groupId]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/groups/${groupId}/expenses`);
        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, [groupId]);

  if (!group) {
    return <div>Loading...</div>;
  }

  const { name, description } = group;

  return (
    <div className='w-full min-h-screen'>
        {/** Group Info (Image, name, desc, ) */}
        <div className='flex flex-col sm:flex-row justify-center align-center m-3 p-2'>
            <div className=''>
                <img src='/cf_imago.png' className='h-80 w-full object-cover' alt='Group'></img>
            </div>
            <div className='w-auto sm:w-2/3 flex flex-col'>
                <div className='mb-auto'>
                    <h2 className='font-bold text-3xl mt-2'>{ name }</h2>
                    <p className='font-normal text-xl mt-2'>{ description }</p>
                </div>

                <div className='flex flex-wrap justify-around'>
                    <Link to="/">
                        <button
                            className="bg-green-600 rounded-full font-semibold text-white px-12 py-2 my-2 cursor-pointer">
                            Settle Up
                        </button>
                    </Link>
                    <Link to="/">
                        <button
                            className="bg-green-600 rounded-full font-semibold text-white px-12 py-2 my-2 cursor-pointer">
                            Members
                        </button>
                    </Link>
                    <Link to="/">
                        <button
                            className="bg-green-600 rounded-full font-semibold text-white px-12 py-2 my-2 cursor-pointer">
                            Analytics
                        </button>
                    </Link>
                </div>
            </div>
        </div>

           {/** Expenses Container */}
           <div className='flex flex-col items-center'>
            {
                expenses.length > 0 ? expenses.map((expense) => (
                    <ExpenseCard
                        key={expense._id}
                        expense={expense}
                     />
                )) : <div>No expenses yet, click to add a new expense</div>
            }
        </div>

        {/** New Expense Button */}
        <div className='flex justify-center mt-2'>
            <Link to={`/group/${groupId}/newexpense`}>
                <button
                    className="bg-green-600 rounded-full font-semibold text-white px-12 py-2 my-2 cursor-pointer">
                    New Expense
                </button>
            </Link>
        </div>
    </div>
  )
}

export default Group