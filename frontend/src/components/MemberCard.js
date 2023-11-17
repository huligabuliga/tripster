import React, { useState, useEffect } from 'react'

const MemberCard = ({ id }) => {
    const [name, setName] = useState([""])
    
    useEffect(() => {
        const fetchName = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/users/${id}/info`)
                const data = await res.json()
                setName(data.username)
            } catch (err) {
                console.error(err)
            }
        }

        fetchName()
    }, [])

    return (
        <div className='flex flex-wrap w-3/4 sm:w-4/5 align-center justify-between rounded-xl m-4 p-2 shadow-xl'>
            <h2 className='font-bold text-xl mt-2'>
                { name }
            </h2>
        </div>
    )
}

export default MemberCard