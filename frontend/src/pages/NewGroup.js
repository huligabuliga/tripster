import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const NewGroup = () => {
    const { groupId } = useParams();
    const { userId } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showCode, setShowCode] = useState(false);
    const [code, setCode] = useState('');
    const navigate = useNavigate();
    
    console.log(userId);
    console.log(groupId)

    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/api/groups/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, description, members: [userId] }),
            });
            const data = await response.json();
            console.log(data);
    
            // Check if the group was created successfully
            if (response.ok) {
                setShowCode(true);
                setCode(data.code);
                setSuccessMessage('Group created successfully!');
                setErrorMessage('');
            } else {
                setShowCode(false);
                setSuccessMessage('');
                setErrorMessage('Something went wrong creating the group.');
            }
        }
        catch(error) {
            console.log(`Error: ${error}`);
            setShowCode(false);
            setSuccessMessage('');
            setErrorMessage('Something went wrong creating the group.');
        }
    }
    const handleBackToHome = () => {
        navigate(`/home/${userId}`);
    }
 
    return (
        <div className='w-full min-h-screen'>
            {/** Header */}
            <div className=''>
                <h2 className='text-3xl font-bold mb-2 text-center'>New Group</h2>
            </div>

            {/** Form */}
            <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                <div className='flex flex-col w-1/2'>
                    <label htmlFor='name' className='text-lg font-bold mb-2'>Name</label>
                    <input
                        type='text'
                        id='name'
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className='border rounded-lg py-2 px-3 mb-2'
                    />
                </div>

                <div className='flex flex-col w-1/2'>
                    <label htmlFor='description' className='text-lg font-bold mb-2'>Description</label>
                    <textarea
                        id='description'
                        defaultValue={description}
                        onChange={(event) => setDescription(event.target.value)}
                        className='border rounded-lg py-2 px-3 mb-2'
                    />
                </div>

                <button
                    type='submit'
                    className='bg-green-600 rounded-full font-semibold text-white px-12 py-2 my-2 cursor-pointer'
                >
                    Create Group
                </button>

                {showCode && (
                    <div className='flex flex-col items-center'>
                        <p className='text-lg font-bold mb-2'>Your group code is:</p>
                        <p className='text-3xl font-bold mb-2'>{code}</p>
                        <button
                            className='bg-green-600 rounded-full font-semibold text-white px-12 py-2 my-2 cursor-pointer'
                            onClick={handleBackToHome}
                        >
                            Back to Home
                        </button>
                    </div>
                )}

                {successMessage && (
                    <p className='text-green-600 font-bold'>{successMessage}</p>
                )}

                {errorMessage && (
                    <p className='text-red-600 font-bold'>{errorMessage}</p>
                )}
            </form>
        </div>
    )
}

export default NewGroup;