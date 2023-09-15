import React from 'react'
import { Link } from 'react-router-dom'

const GroupCard = ({ _id, name, description}) => {
  return (
    <div className='flex w-3/4 sm:w-5/12 align-center content-center rounded-xl m-4 p-2 shadow-xl'>
        <Link to='/login'>
            <div className='w-1/3'>
                <img src='/cf_imago.png' alt='Group'></img>
            </div>
            <div className='w-2/3 ml-2'>
                <h2 className='font-bold text-xl mt-2'>{ name }</h2>
                <p className='font-normal text-base mt-2'>{ description }</p>
            </div>
        </Link>
    </div>
  )
}

export default GroupCard