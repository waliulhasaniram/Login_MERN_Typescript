import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css';
import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';
import Logout from './components/Logout';

function App() {

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/signup" element={<Registration />}/>
            <Route path="/signin" element={<Login />}/>
            <Route path="/logout" element={<Logout />}/>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
