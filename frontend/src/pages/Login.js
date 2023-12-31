import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegEnvelope, FaKey } from "react-icons/fa"

import '../cftools.css';

const Login = () => {
  return (
      <div className='justify-center cfbg_01 h-screen w-full'>
            <div className='flex flex-col justify-center  max-w-[400px] w-full px-2 py-3 mx-auto text-center bg-slate-50 rounded-lg shadow-lg shadow-gray-400'>
                <img src='/coinfusionLogoGreen.jpg' alt='Coinfusion Logo'></img>
                <h2 className='text-3xl font-bold mb-2'>Log In</h2>

                <div className="flex justify-center mb-2">
                    <div className="bg-gray-100 flex items-center w-64 p-2">
                        <FaRegEnvelope className="mr-2" />
                        <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="bg-gray-100 outline-none flex-1 cursor-pointer"
                    />
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="bg-gray-100 flex items-center w-64 p-2">
                        <FaKey className="mr-2" />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="bg-gray-100 outline-none flex-1"
                    />
                    </div>
                </div>

                <button
                    className="bg-green-600 rounded-full font-semibold text-white px-12 py-2 my-2 cursor-pointer"
                    type="submit"
                >
                    Log In
                </button>

                <p>
                    Don't have an account?{" "}
                    <Link to="/register" className="font-semibold text-green-600">
                        Register!
                    </Link>
                </p>
            </div>
        </div>
  )
}

export default Login