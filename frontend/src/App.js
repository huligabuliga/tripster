import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NewExpense from './pages/NewExpense'
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='newexpense' element={<NewExpense />} />
    </Routes>
  );
}

export default App;
