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
import  'bootstrap/dist/css/bootstrap.min.css'
import { AdminService } from './components/AdminService';

function App() {


  return (
    <GoogleOAuthProvider clientId="1002992352679-im73irjpi9c8cgrs6v6tcjli39poi8mh.apps.googleusercontent.com">
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
