import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Routes, Route, Link } from "react-router-dom";

import './App.css'
import { Login } from './components/Login';
import { GlobalProvider } from './components/context/GlobalState';
import { Panel } from './components/Panel';
import { Services } from './components/Services';
import { Home } from './components/Home';

function App() {


  return (

    <GlobalProvider>

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />

        <Route path='/panel' element={<Panel />} />
        <Route path='/service/:idAuto' element={<Services />} />
      </Routes>
    </GlobalProvider>

  )
}

export default App
