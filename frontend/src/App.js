import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Group from './pages/Group'
import NewExpense from './pages/NewExpense'
import SettleUp from './pages/SettleUp'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='group/:groupid' element={<Group />} />
      <Route path='newexpense' element={<NewExpense />} />
      <Route path='settleup' element={<SettleUp />} />
    </Routes>
  );
}

export default App;
