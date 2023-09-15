import React, {useState} from 'react'
import { FaRegEnvelope, FaKey, FaUser } from "react-icons/fa"
import newRequest from '../utils/newRequest'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    //usestates
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [error, setError] = useState(null)

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            const res = await newRequest.post("/auth/register", { username, email, password });
            console.log(res);
            localStorage.setItem("currentUser", JSON.stringify(res.data));
            
            //navigate to login page
            navigate("/login");
            
        } catch (error) {
            setError(error.response.data.message);
            console.log(error);
        }
    };


  return (
    <div className='justify-center cfbg_01 h-screen w-full flex items-center'>
        <div className='flex flex-col justify-center  max-w-[400px] w-full px-2 py-3 mx-auto text-center bg-slate-50 rounded-lg shadow-lg shadow-gray-400'>
            <img src='/coinfusionLogoGreen.jpg' alt='Coinfusion Logo'></img>
            <h2 className='text-3xl font-bold mb-2'>Create Account</h2>
            <form onSubmit={handleSubmit}>
            <div className="flex justify-center mb-2">
                <div className="bg-gray-100 flex items-center w-64 p-2">
                    <FaUser className="mr-2" />
                    <input
                        type="text"
                        name="user"
                        placeholder="Username"
                        className="bg-gray-100 outline-none flex-1"
                        onChange={e=>setUsername(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex justify-center mb-2">
                <div className="bg-gray-100 flex items-center w-64 p-2">
                    <FaRegEnvelope className="mr-2" />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="bg-gray-100 outline-none flex-1"
                        onChange={e=>setEmail(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex justify-center mb-2">
                <div className="bg-gray-100 flex items-center w-64 p-2">
                    <FaKey className="mr-2" />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="bg-gray-100 outline-none flex-1"
                        onChange={e=>setPassword(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex justify-center">
                <div className="bg-gray-100 flex items-center w-64 p-2">
                    <FaKey className="mr-2" />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        className="bg-gray-100 outline-none flex-1"
                        onChange={e=>setConfirmPassword(e.target.value)}
                    />
                </div>
            </div>

            <button
                type="submit"
                className="border-2 bg-green-600 rounded-full font-semibold text-white px-12 py-2 my-2"
            >
                Create Account
            </button>
            {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    </div>
  )
}

export default Register