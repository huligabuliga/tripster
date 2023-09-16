import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaSearch, FaBell, FaUser } from 'react-icons/fa'

const Sidebar = () => {
  return (
    <div className='h-screen w-80 flex flex-col bg-green-500'>
        {/** Logo */}
        <div>
            <img src='/cf_logo_wh.png' className='w-full h-auto p-2' alt="Coinfusion Logo"></img>
        </div>

        {/** Home */}
        <div>
            <Link to='/'>
                <div className='flex flex-row justify-center py-5 text-slate-50'>
                    <FaHome className=" text-3xl mx-4" />
                    <h2 className='font-semibold text-xl flex-grow'>Home</h2>
                </div>
            </Link>
        </div>

        {/** Search */}
        <div>
            <Link to='/search'>
                <div className='flex flex-row justify-center pb-5 text-slate-50'>
                    <FaSearch className=" text-3xl mx-4" />
                    <h2 className='font-semibold text-xl flex-grow'>Search</h2>
                </div>
            </Link>
        </div>

        {/** Notifications */}
        <div>
            <Link to='/notifications'>
                <div className='flex flex-row justify-center pb-5 text-slate-50'>
                    <FaBell className=" text-3xl mx-4" />
                    <h2 className='font-semibold text-xl flex-grow'>Notifications</h2>
                </div>
            </Link>
        </div>

        {/** My Account */}
        <div>
            <Link to='/profile'>
                <div className='flex flex-row justify-center text-slate-50'>
                    <FaUser className=" text-3xl mx-4" />
                    <h2 className='font-semibold text-xl flex-grow'>My Account</h2>
                </div>
            </Link>
        </div>
    </div>
  )
}

export default Sidebar