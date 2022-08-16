import React, { useContext, useEffect } from 'react'
import { GlobalContext } from './context/Contex';

export const ServicesOneCar = ({ idAuto }) => {
    const { postNewService, serviceCar, putAsociarServiceToAuto, getAutoDetail, autoDetail } = useContext(GlobalContext);
    const token = JSON.parse(window.localStorage.getItem("token"));

    useEffect(() => {
        getAutoDetail(idAuto, token)


    }, [])

console.log(autoDetail.service)
    return (
        <div>
            {autoDetail?.service?.map(service => {
                return (
                    <div key={service._id}>
                        <h2>Detalle:{service.servicio}--</h2>
                        <div>
                            <ul>
                            <li>Proxima revisión: {service.nextServiceKm} km - o el dia: {service.nextServiceFecha}</li>
                            <li>Proximos service: {autoDetail.kilometraje + service.nextServiceKm } -</li>
                            </ul>

                        </div>

                    </div>
                )
            })}
        </div>
    )
}
