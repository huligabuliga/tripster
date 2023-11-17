import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useMediaQuery } from './hooks/hooks';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Group from './pages/Group';
import NewExpense from './pages/NewExpense';
import SettleUp from './pages/SettleUp';
import JoinGroup from './pages/JoinGroup';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import NewGroup from './pages/NewGroup';
import UserInfo from './pages/GetUser';
import NotFound from './pages/NotFound'
import RequireAuth from './components/RequireAuth';


function App() {
  const [userId, setUserId] = useState(null);
  const isMobile = useMediaQuery(640);

  useEffect(() => {
    // Check if user data is already stored in localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUserId(currentUser._id);
    } else {
      // Fetch user data and set the userId state variable
      fetch('/api/user')
        .then(response => response.json())
        .then(data => {
          if (data.userId) {
            setUserId(data.userId);
          }
        })
        .catch(error => console.error(error));
    }
  }, []);

  return (
    <div className='flex flex-col sm:flex-row'>
      {/** If bigger than mobile, display sidebar */}
      {!isMobile && <Sidebar userId={userId} />}
      <Routes>
        {/** Public routes */}
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />

        {/** Protected routes */}
        <Route element={<RequireAuth />} >
          <Route path='' element={<Home />} />
          <Route path='group/:groupid' element={<Group />} />
          <Route path='newexpense' element={<NewExpense />} />
          <Route path='settleup' element={<SettleUp />} />
          <Route path='joinGroup' element={<JoinGroup />} />
          <Route path='profile/:userid' element={<Profile />} />
          <Route path='profile/:userid/edit' element={<EditProfile />} />
          <Route path='newGroup' element={<NewGroup />} />
          <Route path='users/:userId' exact component={UserInfo} />
        </Route>
        
        { /** Catch all route */}
        <Route path='*' element={<NotFound />} />
      </Routes>
      {/** If mobile size, display bottom navbar */}
      {isMobile && <Navbar />}
    </div>
  );
}

export default App;