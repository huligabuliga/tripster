import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import GroupCard from '../components/GroupCard'
import '../cftools.css';

const Home = () => {
    const { userId } = useParams();
    const [groups, setGroups] = useState([]);

    const fetchGroups = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/users/${userId}/groups`);
            const data = await response.json();
            setGroups(data);
        }
        catch(error) {
            console.log(`Error: ${error}`)
        }
    }

    useEffect(() => {
        fetchGroups();
    }, [userId]);

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
                        _id={group._id}
                        name={group.name}
                        description={group.description}
                    />
                ))}
            </div>

            {/** Buttons */}
            <div className='flex justify-evenly mt-2'>
                <Link to={`/home/${userId}/joinGroup`}>
                    <button
                        className="bg-green-600 rounded-full font-semibold text-white px-12 py-2 my-2 cursor-pointer">
                        Join Group
                    </button>
                </Link>

                <Link to={`/home/${userId}/newGroup`}>
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