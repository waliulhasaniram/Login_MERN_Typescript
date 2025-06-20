import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css';
import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';
import Logout from './components/Logout';
import UpdateData from './components/UpdateData';

function App() {

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/signup" element={<Registration />}/>
            <Route path="/signin" element={<Login />}/>
            <Route path="/logout" element={<Logout />}/>
            <Route path="/update_data/:id" element={<UpdateData />}/>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
