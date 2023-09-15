import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GroupCard from '../components/GroupCard'

const Home = () => {
    const dummyGroups = [
        {_id: '435678iyhjadfa', name: 'Carne asada', description: 'Carnita asada description', code: 'ABC123', members: [], expenses: []},
        {_id: 'gv87yuhjnjoplk', name: 'Viaje a CDMX', description: 'Boletos de avión, hospedaje y comidas', code: 'DEF456', members: [], expenses: []},
        {_id: 'fr7gyuvhjno999', name: 'Concierto de un artista', description: 'Ir a concierto de un artista', code: 'XYZ789', members: [], expenses: []}
    ]
    const [groups, setGroups] = useState(dummyGroups)

  const fetchGroups = async () => {
    try {
        // Fetch to backend
        // Assign fetched groups to groups
        console.log('Testing...')
    }
    catch(error) {
        console.log(`Error: ${error}`)
    }
  }

  useEffect(() => {
    fetchGroups();
  }, [])

  return (
    <div className='w-full min-h-screen'>
        {/** Header */}
        <div className=''>
            <h2 className='text-3xl font-bold mb-2 text-center'>Home</h2>
        </div>

        {/** Groups */}
        <div className='flex flex-wrap justify-center'>
            {groups.map((group) => (
                <GroupCard
                    key={group._id}
                    name={group.name}
                    description={group.description}
                />
            ))}
        </div>

        {/** Buttons */}
        <div className='flex justify-evenly mt-2'>
            <Link to="/login">
                <button
                    className="bg-green-600 rounded-full font-semibold text-white px-12 py-2 my-2 cursor-pointer">
                    Join Group
                </button>
            </Link>

            <Link to="/register">
                <button
                    className="bg-green-600 rounded-full font-semibold text-white px-12 py-2 my-2 cursor-pointer">
                    New Group
                </button>
            </Link>
        </div>
    </div>
  )
}

export default Home