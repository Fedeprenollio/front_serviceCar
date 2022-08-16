import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from './context/Contex';

export const TusAutos = () => {
	const {autos, getAutos, deleteAuto } = useContext(GlobalContext);
    const navigate = useNavigate()
    const token = JSON.parse(window.localStorage.getItem("token"));

useEffect(()=>{
    getAutos(token)
},[])

const handleClickDelete= async(e)=>{
await deleteAuto(e.target.value)
await getAutos(token)
}

const handleGoService=(e)=>{
    navigate(`/service/${e.target.value}`)
}
  return (
    <div>
        {autos &&
            autos?.map(auto=>{
                return(
                    <div key={auto._id}>
                        <h2>{auto.vehiculo}</h2>
                        <span>Modelo: {auto.modelo}</span>
                        <span>Kilometros: {auto.kilometraje}</span>
                        <button>Editar</button>
                        <button type='button' value={auto._id} onClick={handleClickDelete}>Eliminar</button>
                        <button type='button' value={auto._id} onClick={handleGoService}>Ir a services</button>
                    </div>
                    
                )
            }) 
        }
    <div>TusAutos</div>
    </div>
  )
}
