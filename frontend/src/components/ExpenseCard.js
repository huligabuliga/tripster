import React from 'react'

const ExpenseCard = ({ expense }) => {
  return (
    <div className='flex flex-wrap w-3/4 sm:w-4/5 align-center justify-between rounded-xl m-4 p-2 shadow-xl'>
        <div className='flex flex-col justify-center w-1/4 sm:w-1/5'>
            <p className='text-xs sm:text-sm text-center'>
                15/09/2023
            </p>
        </div>
        <div className='w-1/2 mx-1'>
            <h2 className='font-bold text-xl mt-2'>{ expense.name }</h2>
            <p className='font-normal text-base mt-2'>{expense.totalAmount + ' ' + expense.currency} paid by {expense.payer}</p>
        </div>
        <div className='w-1/5 flex flex-col justify-center text-center'>
            <p className='text-xs sm:text-sm'>You owe:</p>
            <p className='text-xs sm:text-sm font-semibold'>$$$</p>
        </div>
    </div>
  )
}

export default ExpenseCard