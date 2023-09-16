import { Routes, Route } from 'react-router-dom'
import { useMediaQuery } from './hooks/hooks'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Group from './pages/Group'
import NewExpense from './pages/NewExpense'
import SettleUp from './pages/SettleUp'
import JoinGroup from './pages/JoinGroup'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

function App() {
  let isMobile = useMediaQuery(640) // Know if device size is mobile to decide between sidebar/navbar

  return (
    <div className='flex flex-col sm:flex-row'>
      {/** If bigger than mobile, display sidebar */}
      { !isMobile && <Sidebar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='group/:groupid' element={<Group />} />
        <Route path='newexpense' element={<NewExpense />} />
        <Route path='settleup' element={<SettleUp />} />
        <Route path='joingroup' element={<JoinGroup />} />
      </Routes>
      {/** If mobile size, display bottom navbar */}
      { isMobile && <Navbar />}
    </div>
  );
}

export default App;
