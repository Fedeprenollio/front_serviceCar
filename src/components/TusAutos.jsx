import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "./context/Contex";
import { Container, Card, ListGroup, Button, Row, Col } from "react-bootstrap";
import NavBar from "./NavBar";
import { ModalEditKm } from "./ModalEditKm";
import { ModalEditCar } from "./ModalEditCar";
import { ModalNewCar } from "./ModalNewCar";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ModalEditNotesCar } from "./ModalEditNotesCar";
const MySwal = withReactContent(Swal)

export const TusAutos = () => {
  const { autos, getAutos, deleteAuto,clearDetail } = useContext(GlobalContext);
  const [editing, setEditing] = useState(false);
  const [show, setShow] = useState(false);
  const [showEditKm, setShowEditKm] = useState(false);
  const [showEditNotes, setShowEditNotes] = useState(false);
  const [showNewCar, setShowNewCar] = useState(false);
  const [idAuto, setIdAuto] = useState("");
  const navigate = useNavigate();


  const token = JSON.parse(window.localStorage.getItem("token"));

  useEffect(() => {
    getAutos(token);
    return  ()=>{ 
      clearDetail()}
  }, []);

  const handleClickDelete = async (e) => {
    MySwal.fire({
      title: '¿Deseas eliminar a tu auto?',
      text: "No prodras revertir la eliminación",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then( async(result) => {
      if (result.isConfirmed) {

     
    await deleteAuto(e.target.value);
    await getAutos(token);

        MySwal.fire(
          'Eliminacón correcta!',
            "",
          'success'
        )
      }
    })




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
  const handleClickEditNotes = (autoId) => {
    setShowEditNotes(true);
    setIdAuto(autoId);
  };
  return (
    <Container>
      <div className="d-grid gap-2 my-3">
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
                  <button style={{border:"none", textAlign:"start"}} type="button">
                  <Card.Text  onClick={() => handleClickEditNotes(auto._id)}>
                   Notas: {auto.notes || "Nada por el momento" } 
                  </Card.Text>
                  </button>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>Modelo: {auto.model}</ListGroup.Item>

                  <button style={{border:"none", textAlign:"start"}} type="button">
                  <ListGroup.Item
                    onClick={() => handleClickEditKmModal(auto._id)}
                    >
                    Kilometros: {auto.kilometraje}
                  </ListGroup.Item>
                    </button>

                  {/* <ListGroup.Item>Vestibulum at eros</ListGroup.Item> */}
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
      {showEditNotes && <ModalEditNotesCar show={showEditNotes} setShow={setShowEditNotes} idAuto={idAuto} />}
      {showNewCar && <ModalNewCar show={showNewCar} setShow={setShowNewCar} idAuto={idAuto} />}
    </Container>
  );
};
