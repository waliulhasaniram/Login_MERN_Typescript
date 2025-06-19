import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css';
import Home from './components/Home';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Logout from './components/Logout';
import UpdateData from './components/UpdateData';
import PasswordUpdate from './components/PasswordUpdate';

function App() {

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/signup" element={<RegistrationForm />}/>
            <Route path="/signin" element={<LoginForm />}/>
            <Route path="/logout" element={<Logout />}/>
            <Route path="/update-data/:id" element={<UpdateData />}/>
            <Route path="/update-password/:id" element={<PasswordUpdate />}/>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
