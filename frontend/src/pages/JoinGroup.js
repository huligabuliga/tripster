import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const JoinGroup = () => {
    const { auth } = useAuth();
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false); // new state variable
    const userId = auth.id
    const navigate = useNavigate();
    console.log('THE ID IS ', auth.id, userId);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Data sent:", { userId, code });
        try {
            const response = await axios.post('http://localhost:3001/api/groups/join', { userId, code });

            console.log(response.data);
            setSuccess(true); // set success state to true
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const handleBack = () => {
        navigate(`/`);
    };

    return (
        <div className="w-full min-h-screen flex flex-col">
            {/** Header */}
            <h1 className="text-3xl font-bold my-4 text-center">Join Group</h1>

            {/** Join Group Section */}
            <form onSubmit={handleSubmit} className='flex flex-col items-center mx-4 mt-10'>
                <div className="mb-4">
                    <label htmlFor="code" className="block font-bold text-xl mb-2">Group Code:</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded"
                        id="code"
                        value={code}
                        onChange={(event) => setCode(event.target.value.toUpperCase().slice(0, 5))}
                        maxLength={5}
                        required
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">You have successfully joined the group!</p>} {/* success message */}
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full my-2 cursor-pointer">
                    Join
                </button>
                <button type="button" onClick={handleBack} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full my-2 cursor-pointer">
                    Back
                </button>
            </form>

            {/** Group code explanation */}
            <p className='text-gray-500/40 px-4 text-center'>
                Group codes are 5 characters in length and allow you to join a group. Get a group's code from one of its members.
            </p>
        </div>
    );
};

export default JoinGroup;