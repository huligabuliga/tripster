import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GroupCard from '../components/GroupCard'
import useAuth from '../hooks/useAuth'
import '../cftools.css';

const Home = () => {
    const { auth } = useAuth();
    const [groups, setGroups] = useState([]);

    const fetchGroups = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/users/${auth.id}/groups`);
            const data = await response.json();
            // console.log('User ID is ', auth.id)
            setGroups(data);
        }
        catch(error) {
            console.log(`Error: ${error}`)
        }
    }

    useEffect(() => {
        fetchGroups();
    }, [auth.id]);

    return (
        <div className='w-full min-h-screen home-main-block'>
            {/** Header */}
            <div className='cfbg_02' ></div>
            <div style={{ paddingBottom: '60px', paddingTop: '20px' }}>
                <h2 className='text-3xl font-bold mb-2 text-center'>Welcome!</h2>
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
                <Link to={`/joinGroup`}>
                    <button
                        className="rounded-full font-semibold text-white px-12 py-2 my-2 cursor-pointer cfhvhm">
                        Join Group
                    </button>
                </Link>

                <Link to={`/newGroup`}>
                    <button
                        className="rounded-full font-semibold text-white px-12 py-2 my-2 cursor-pointer cfhvhm">
                        New Group
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Home
