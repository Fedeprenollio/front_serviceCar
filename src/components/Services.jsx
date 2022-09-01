import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "./context/Contex";
import { NuevoService } from "./NuevoService";
import { ServicesOneCar } from "./ServicesOneCar";

import { Container } from "react-bootstrap";
import NavBar from "./NavBar";
import { ServicesOneCarTable } from "./ServicesOneCarTable";

export const Services = () => {
  const { getServicesGenerales, servicesGral } = useContext(GlobalContext);
  const { idAuto } = useParams();
  const [idService, setIdService] = useState();

  useEffect(() => {
    getServicesGenerales();
  }, []);

  return (
    <Container>
        <NavBar/>
      {/* <h2>Services generales:</h2>
      {servicesGral &&
        servicesGral.map((serv) => {
          return (
            <div key={serv._id}>
              <span>Categoria: {serv.categoria}</span>
              <span>Servicio: {serv.servicio}</span>
              <span>Periodicidad: {serv.tiempoProgramado} Km</span>
              <button
                value={serv._id}
                onClick={(e) => setIdService(e.target.value)}
              >
                Seleccionar
              </button>
            </div>
          );
        })} */}

      {/* <NuevoService idService={idService} idAuto={idAuto} /> */}
      {/* <ServicesOneCar idAuto={idAuto} /> */}
      <ServicesOneCarTable idAuto={idAuto} />
    </Container>
  );
};
