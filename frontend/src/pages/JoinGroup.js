import React, { useState } from 'react';
import axios from 'axios';
// css file 
// import './JoinGroup.css';
import '../cftools.css';
import { useNavigate } from 'react-router-dom';
const JoinGroup = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/groups/join', { code });

            console.log(response.data);
            navigate('/')
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Join Group</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="code" className="block font-bold mb-2">Code:</label>
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
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full my-2 cursor-pointer">
                    Join
                </button>
            </form>
        </div>
    );
};

export default JoinGroup;