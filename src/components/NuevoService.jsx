import React, { useContext, useState } from 'react'
import { GlobalContext } from './context/Contex';
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

export const NuevoService = ({ idAuto, idService }) => {
  const token = JSON.parse(window.localStorage.getItem("token"));

  const { postNewService, putAsociarServiceToAuto, getAutoDetail, servicesGral,autoDetail } = useContext(GlobalContext);

  const serviceSelect = servicesGral.find(s => s._id === idService)
  const [service, setService] = useState({
    servicio: serviceSelect?.servicio|| "" , 
    lugar:  "",
    nextServiceKm: "",
    nextServiceFecha:serviceSelect?.tiempoProgramado ||""
  }) 
  


  const handleChange = (e) => {
    setService({
      ...service,
      [e.target.name]: e.target.value
    })
  }
  const handleSumbit = async (e) => {
    e.preventDefault()
    const newService = await postNewService(service, token)
    await putAsociarServiceToAuto(idAuto, { service: newService._id }, token)
    await getAutoDetail(idAuto, token)
  }

  return (
    <div>
      <h2>Nuevo service: {autoDetail?.vehiculo}, actualmete {autoDetail.kilometraje} km </h2>
     
      <form onSubmit={handleSumbit} >
        <input onChange={handleChange} value={service.servicio} placeholder="Nombre" type="text" name="servicio" />
        <input onChange={handleChange} value={service.lugar} placeholder="Lugar" type="text" name="lugar" />
        <input onChange={handleChange} value={service.nextServiceKm} placeholder="Proximo (Km)" type="text" name="nextServiceKm" />
        <input onChange={handleChange} value={service.nextServiceFecha} placeholder="Proximo (Fecha)" type="text" name="nextServiceFecha" />
        <hr />
        <input onChange={handleChange} value={autoDetail.kilometraje} placeholder="Kilometros actuales" type="text" name="currentKm" /> <span>km</span>
        <span>Seguiente service a los</span><input onChange={handleChange} value={Number(autoDetail.kilometraje) + Number(service.nextServiceKm)} placeholder="Kilometros actuales" type="text" name="currentKm" /> <span>km</span>
        <button>Crear</button>

      </form>
    </div>
  )
}
