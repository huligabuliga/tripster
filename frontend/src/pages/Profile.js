import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaEdit, FaSignOutAlt } from 'react-icons/fa'

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/users/${userId}/info`);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='w-full min-h-screen'>
      {/** Header */}
      <h1 className='text-3xl font-bold my-4 text-center'>
        My Account
      </h1>

      {/** Content */}
      <div className='flex flex-col justify-center items-center'>
        {/** User Icon */}
        <p className='text-8xl text-center p-12 rounded-full mb-4 bg-green-200'>
          {user.username.charAt(0).toUpperCase()}
        </p>

        {/** Username */}
        <h2 className='text-3xl font-semibold mb-10'>
          {user.username}
        </h2>

        {/** Edit Profile */}
        <Link to={`/profile/${userId}/edit`}>
          <div className='flex flex-row justify-center py-5'>
            <FaEdit className=" text-3xl mr-4" />
            <h2 className='font-semibold text-xl flex-grow'>Edit profile</h2>
          </div>
        </Link>

        {/** Log Out */}
        <Link to='/login'>
          <div className='flex flex-row justify-center rounded-full px-8 py-4 bg-red-500'>
            <FaSignOutAlt className=" text-3xl mr-4" />
            <h2 className='font-semibold text-xl'>Log Out</h2>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Profile;