import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./context/Contex";
import { Container, Card, ListGroup, Button, Row } from "react-bootstrap";
import { ModalNewService } from "./ModalNewService";

export const ServicesOneCar = ({ idAuto }) => {

  const [show, setShow] = useState(false);

  const {
    postNewService,
    serviceCar,
    putAsociarServiceToAuto,
    getAutoDetail,
    autoDetail,
    deleteService,
  } = useContext(GlobalContext);
  const token = JSON.parse(window.localStorage.getItem("token"));

  useEffect(() => {
    getAutoDetail(idAuto, token);
  }, []);

  const handleClickDeleteService = async (e) => {
    console.log("holaaa")
    await deleteService(e.target.value,token);
    await  getAutoDetail(idAuto, token);
  };

  return (
    <Container className="mt-4">
        <div className="d-grid gap-2 mt-2 mb-2">
        <Button onClick={()=>setShow(true)} size="lg" variant="info">
          Agregar nuevo service
        </Button> 
      </div>
      <Row xs={1} md={2} className="g-4">
        {autoDetail?.service?.map((service) => {
          return (
            <Card className="m-4" key={service._id} style={{ width: "35rem" }}>
              {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
              <Card.Body>
                <Card.Title>{service.servicio}</Card.Title>
                <Card.Title>Categoía: {service.categoria}</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>Fecha: {service.create_at}</ListGroup.Item>
                <ListGroup.Item>Lugar: {service.lugar}</ListGroup.Item>
                <ListGroup.Item>
                  Kilometros en el service:{service.currentKm} km{" "}
                </ListGroup.Item>
                <ListGroup.Item>
                  Proximo service a los :{service.nextServiceKm} km{" "}
                </ListGroup.Item>
                <ListGroup.Item>
                  Proximo service el dia :{service.nextServiceFecha}{" "}
                </ListGroup.Item>
                <ListGroup.Item>Faltan para el control : {  service.nextServiceKm -(    autoDetail.kilometraje- service.currentKm)} Km </ListGroup.Item>
              </ListGroup>                                      
              <Card.Body className="d-grid gap-2">
                <Button
                  variant="danger"
                  type="button"
                  value={service._id}
                  onClick={handleClickDeleteService}
                >
                  Eliminar
                </Button>
                <Button
                  type="button"
                  // value={service._id}
                  // onClick={handleGoService}
                >
                  Editar
                </Button>
                <Button
                  type="button"
                  // value={service._id}
                  // onClick={handleGoService}
                >
                  Detalles
                </Button>
              </Card.Body>
            </Card>
            //   <div key={service._id}>
            //     <h2>Detalle:{service.servicio}--</h2>
            //     <div>
            //       <ul>
            //         <li>
            //           Proxima revisión: {service.nextServiceKm} km - o el dia:{" "}
            //           {service.nextServiceFecha}
            //         </li>
            //         <li>
            //           Proximos service:{" "}
            //           {autoDetail.kilometraje + service.nextServiceKm} -
            //         </li>
            //       </ul>
            //     </div>
            //   </div>
          );
        })}
      </Row>


      {show && <ModalNewService show={show} setShow={setShow} idAuto={idAuto} />}


    </Container>
  );
};
