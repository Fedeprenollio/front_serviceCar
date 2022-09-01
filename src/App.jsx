import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Routes, Route, Link } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import './App.css'
import { Login } from './components/Login';
import { GlobalProvider } from './components/context/GlobalState';
import { Panel } from './components/Panel';
import { Services } from './components/Services';
import { Home } from './components/Home';
import { Signup } from './components/Signup';
import { AdminService } from './components/AdminService';

function App() {


  return (
    <GoogleOAuthProvider clientId= {import.meta.env.VITE_APP_GOOGLE_CLIENTE_ID }>
    <GlobalProvider>

      <Routes>
        
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Home />} />

        <Route path='/panel' element={<Panel />} />
        <Route path='/service/:idAuto' element={<Services />} />
        <Route path='/adminService' element={<AdminService />} />
      </Routes>
    </GlobalProvider>
</GoogleOAuthProvider>
  )
}

export default App
