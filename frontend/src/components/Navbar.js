import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaSearch, FaBell, FaUser } from 'react-icons/fa'

const Navbar = () => {
  return (
    <div className='w-screen h-16 sticky bottom-0 flex flex-row justify-around items-center bg-green-500'>
        {/** Home */}
        <div>
            <Link to='/'>
                <div className='flex flex-col text-slate-50 items-center w-20'>
                    <FaHome className='text-2xl mt-1' />
                    <h2 className='font-semibold text-xs'>Home</h2>
                </div>
            </Link>
        </div>

        {/** Search */}
        <div>
            <Link to='/search'>
                <div className='flex flex-col text-slate-50 items-center w-20'>
                    <FaSearch className='text-2xl mt-1' />
                    <h2 className='font-semibold text-xs'>Search</h2>
                </div>
            </Link>
        </div>

        {/** Notifications */}
        <div>
            <Link to='notifications'>
                <div className='flex flex-col text-slate-50 items-center w-20'>
                    <FaBell className='text-2xl mt-1' />
                    <h2 className='font-semibold text-xs'>Notifications</h2>
                </div>
            </Link>
        </div>

        {/** My Account */}
        <div>
            <Link to='profile'>
                <div className='flex flex-col text-slate-50 items-center w-20'>
                    <FaUser className='text-2xl mt-1' />
                    <h2 className='font-semibold text-xs'>My Account</h2>
                </div>
            </Link>
        </div>
    </div>
  )
}

export default Navbar