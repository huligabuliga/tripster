import React from 'react'
import { Link } from 'react-router-dom'

const Group = ({ name='Group Name', description='Description' }) => {
  return (
    <div className='w-full min-h-screen'>
        {/** Group Info (Image, name, desc, ) */}
        <div className='flex flex-col sm:flex-row w-4/5 justify-center align-center m-3 p-2'>
            <div className=''>
                <img src='/cf_imago.png' className='h-80 w-full object-cover' alt='Group'></img>
            </div>
            <div className='w-auto sm:w-2/3 flex flex-col'>
                <div className='mb-auto'>
                    <h2 className='font-bold text-xl mt-2'>{ name }</h2>
                    <p className='font-normal text-base mt-2'>{ description }</p>
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
        <div className='flex justify-center bg-green-300'>
            Expenses will appear here
        </div>

        {/** New Expense Button */}
        <div className='flex justify-center mt-2'>
            <Link to="/">
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