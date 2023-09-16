import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ExpenseCard from '../components/ExpenseCard'
import '../cftools.css';
const Group = ({ name='Carne asada en casa de Juan', description='Carne asada en casa del Juan.' }) => {
  const dummyExpenses = [
    {_id: '56tgvbhi8uyhj', name: 'Compra de la carne', categories: ['Comida'], currency: 'MXN', totalAmount: '500', payer: 'Juan', payees: [{user: 'Pedro', shareAmount: 250, sharePercentage: 50}, {user: 'Juan', shareAmount: 250, sharePercentage: 50}]},
    {_id: 'bgy7890plmnbf', name: 'Refrescos', categories: ['Bebida'], currency: 'MXN', totalAmount: '150', payer: 'Pedro', payees: [{user: 'Juan', shareAmount: 75, sharePercentage: 50}, {user: 'Pedro', shareAmount: 75, sharePercentage: 50}]},
    {_id: 'vt67hn2m1kass', name: 'Limones, tomates, chiles y aguacates', categories: ['Comida'], currency: 'MXN', totalAmount: '128', payer: 'Pedro', payees: [{user: 'Juan', shareAmount: 64, sharePercentage: 50}, {user: 'Pedro', shareAmount: 64, sharePercentage: 50}]},
  ]
  const [expenses, setExpenses] = useState(dummyExpenses)

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
                expenses.map((expense) => (
                    <ExpenseCard
                        key={expense._id}
                        expense={expense}
                     />
                ))
            }
        </div>

        {/** New Expense Button */}
        <div className='flex justify-center mt-2'>
            <Link to="/NewExpense">
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