import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "./context/Contex";
import { Container, Card, ListGroup, Button, Row, Col } from "react-bootstrap";
import NavBar from "./NavBar";
import { ModalEditKm } from "./ModalEditKm";
import { ModalEditCar } from "./ModalEditCar";
import { ModalNewCar } from "./ModalNewCar";

export const TusAutos = () => {
  const { autos, getAutos, deleteAuto } = useContext(GlobalContext);
  const [editing, setEditing] = useState(false);
  const [show, setShow] = useState(false);
  const [showEditKm, setShowEditKm] = useState(false);
  const [showNewCar, setShowNewCar] = useState(false);
  const [idAuto, setIdAuto] = useState("");




  const navigate = useNavigate();
  const token = JSON.parse(window.localStorage.getItem("token"));

  useEffect(() => {
    getAutos(token);
  }, []);

  const handleClickDelete = async (e) => {
    await deleteAuto(e.target.value);
    await getAutos(token);
  };

  const handleGoService = (e) => {
    navigate(`/service/${e.target.value}`);
  };

  const handleClickEdit = (e) => {
    setShow(true);
    setIdAuto(e.target.value);
  };
  const handleClickEditKmModal = (autoId) => {
    setShowEditKm(true);
    setIdAuto(autoId);
  };
  return (
    <Container>
      <div className="d-grid gap-2">
        <Button onClick={()=>setShowNewCar(true)} size="lg" variant="info">
          Agregar nuevo auto
        </Button> 
      </div>

      <Row xs={1} md={2} className="g-4">
        {autos &&
          autos?.map((auto) => {
            return (
              <Card key={auto._id} style={{ width: "18rem" }}>
                {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
                <Card.Body>
                  <Card.Title>{auto.vehiculo}</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>Modelo: {auto.model}</ListGroup.Item>
                  <ListGroup.Item
                    onClick={() => handleClickEditKmModal(auto._id)}
                  >
                    Kilometros: {auto.kilometraje}
                  </ListGroup.Item>
                  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
                <Card.Body className="d-grid gap-2">
                  {!editing ? (
                    <>
                      <Button
                        variant="danger"
                        type="button"
                        value={auto._id}
                        onClick={handleClickDelete}
                      >
                        Eliminar
                      </Button>
                      <Button
                        type="button"
                        value={auto._id}
                        onClick={handleClickEdit}
                      >
                        Editar
                      </Button>
                      <Button
                        type="button"
                        value={auto._id}
                        onClick={handleGoService}
                      >
                        Ir a sus services
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="danger" type="button">
                        Eliminar
                      </Button>
                      <Button type="button">Editar</Button>
                      <Button type="button">Ir a sus services</Button>
                    </>
                  )}
                </Card.Body>
              </Card>
            );
          })}
      </Row>

      {show && <ModalEditCar show={show} setShow={setShow} idAuto={idAuto} />}
      {showEditKm && <ModalEditKm show={showEditKm} setShow={setShowEditKm} idAuto={idAuto} />}
      {showNewCar && <ModalNewCar show={showNewCar} setShow={setShowNewCar} idAuto={idAuto} />}
    </Container>
  );
};
