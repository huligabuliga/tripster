import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaHome, FaSearch, FaBell, FaUser } from 'react-icons/fa'

const Sidebar = ({ userId }) => {
  const location = useLocation();
    
  return (
    (location.pathname === '/login' || location.pathname === '/register') ? (<div></div>) : (
    <div className='h-screen w-80 flex flex-col bg-green-500'>
        {/** Logo */}
        <Link to='/'>
            <img src='/cf_logo_wh.png' className='w-full h-auto p-2' alt="Coinfusion Logo"></img>
        </Link>

        {/** Home */}
        <div>
            <Link to={`/home/${userId}`}>
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
            <Link to={`/profile/${userId}`}>
                <div className='flex flex-row justify-center text-slate-50'>
                    <FaUser className=" text-3xl mx-4" />
                    <h2 className='font-semibold text-xl flex-grow'>My Account</h2>
                </div>
            </Link>
        </div>
    </div>
    )
  )
}

export default Sidebar;