import React, { useEffect, useState } from 'react'
import { FaUser, FaRegEnvelope } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

const EditProfile = () => {
  const [user, setUser] = useState({username: 'Memo', email: 'm@gmail.com'})
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const fetchUserInfo = async () => {
    try {
        // Call API and ask for user's username and email
        // And assign it to user using setUser
    }
    catch(error) {
        console.log(`Error: ${error}`)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        // Call API to update username/email
        
        navigate(-1) // Go to previous page
    }
    catch(error) {
        console.log(`Error: ${error}`)
    }
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])

  return (
    <div className='w-full min-h-screen'>
        {/** Header */}
        <h1 className='text-3xl font-bold my-4 text-center'>
            Edit Account
        </h1>

        <form onSubmit={handleSubmit}>
            {/** Content */}
            <div className='flex flex-col justify-center items-center mb-6'>
                {/** User Icon */}
                <p className='text-8xl text-center p-12 rounded-full mb-4 bg-green-200'>
                    {user.username.charAt(0).toUpperCase()}
                </p>

                {/** Username */}
                <h2 className='text-3xl font-semibold mb-10'>
                    {user.username}
                </h2>

                {/** Username and Email Input Fields */}
                <div className="bg-gray-100 flex items-center w-64 p-2 mb-2">
                    <FaUser className="mr-2" />
                    <input
                        type="text"
                        name="user"
                        placeholder={user.username}
                        className="bg-gray-100 outline-none flex-1"
                        onChange={e=>setUsername(e.target.value)}
                    />
                </div>

                <div className="bg-gray-100 flex items-center w-64 p-2">
                    <FaRegEnvelope className="mr-2" />
                    <input
                        type="email"
                        name="email"
                        placeholder={user.email}
                        className="bg-gray-100 outline-none flex-1"
                        onChange={e=>setEmail(e.target.value)}
                    />
                </div>
            </div>

            {/** Save changes and Cancel buttons */}
            <div className='flex flex-row justify-center'>
                <button                
                    className="bg-gray-300 rounded-full font-semibold text-white w-40 py-2 my-2 mr-6 cursor-pointer !important"
                    onClick={() => navigate(-1)}
                >
                    Cancel
                </button>
            
                <button
                    className="bg-green-600 rounded-full font-semibold text-white w-40 py-2 my-2 cursor-pointer !important"
                    type="submit"
                >
                    Save Changes
                </button>
            </div>
        </form>
        
    </div>
  )
}

export default EditProfile