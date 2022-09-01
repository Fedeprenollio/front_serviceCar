import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import  'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import axios from "axios"

axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3001";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
)
