import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center gap-y-8 px-2'>
        {/** Page Not Found Message */}
        <div className='text-center'>
            <h1 className='text-green-600 font-extrabold text-9xl mb-6'>404</h1>
            <h2 className='font-semibold text-4xl mb-2'>Oops! Page Not Found</h2>
            <p className='font-thin text-lg'>Sorry, but it seems the page you're looking for does not exist!</p>
        </div>

        {/** Back to Home */}
        <Link to='/' className='bg-green-600 rounded-full font-semibold text-white px-6 py-2 my-2 cursor-pointer !important'>
            <button>
                Go to Homepage
            </button>
        </Link>
    </div>
  )
}

export default NotFound