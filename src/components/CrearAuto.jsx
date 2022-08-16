import React, { useContext, useState } from 'react'
import { GlobalContext } from './context/Contex';

export const CrearAuto = () => {
	const {postAuto,getAutos } = useContext(GlobalContext);

const [auto, setAuto]= useState()

const handleChange =(e)=>{
    setAuto({
        ...auto,
        [e.target.name]:e.target.value
    })
}

const handleSubmit = async(e)=>{
    e.preventDefault()
    const token = JSON.parse(window.localStorage.getItem("token"));
    
    const newAuto= await postAuto(auto,token)
    await getAutos(token)
}
  return (
    <div>
        
    <form onSubmit={handleSubmit} >
        <input onChange={handleChange} type="text" name='vehiculo' placeholder='Nombre'  />
        <input onChange={handleChange} type="text" name='model' placeholder='Modelo' />
        <input onChange={handleChange} type="text" name='kilometraje' placeholder='Km actuales' />  
        <button type='submit'>Crear</button>
    </form>


    </div>
  )
}
