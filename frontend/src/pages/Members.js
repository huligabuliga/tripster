import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MemberCard from '../components/MemberCard'

const Members = () => {
    const { groupId } = useParams()
    const [members, setMembers] = useState([])
    const [groupCode, setGroupCode] = useState('')

    useEffect(() => {
        // Fetches group members and group code
        const fetchInfo = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/groups/${groupId}`)
                const data = await res.json()
                setMembers(data.members)
                setGroupCode(data.code)
            } catch (err) {
                console.error(err)
            }
        }

        // Do fetch
        fetchInfo()
    }, [groupId])

    return (
        <div className='w-full min-h-screen'>
            {/** Header */}
            <div className=''>
                <h2 className='text-3xl font-bold mb-2 text-center'>Members</h2>
            </div>

            {/** Display group code */}
            <h1 className='text-2xl font-normal my-4 text-center'>
                Group Code is {groupCode}
            </h1>

            {/** Map over group members and display each as a card */}
            <div className='flex flex-wrap justify-center'>
                { 
                    members.map((member) => (
                        <MemberCard
                            key={member}
                            id={member}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Members