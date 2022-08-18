import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./context/Contex";
import {
  Container,
  Card,
  ListGroup,
  Button,
  Row,
  Accordion,
  Table,
  Badge,
  Form,
} from "react-bootstrap";
import { ModalNewService } from "./ModalNewService";
import { ModalRenovService } from "./ModalRenovServ";

export const ServicesOneCarTable = ({ idAuto }) => {
  const [show, setShow] = useState(false);
  const [showRenov, setShowRenov] = useState(false);
  const [idServ, setIdServ] = useState();
  const {
    postNewService,
    serviceCar,
    putAsociarServiceToAuto,
    putService,
    getAutoDetail,
    autoDetail,
    deleteService,
  } = useContext(GlobalContext);
  const token = JSON.parse(window.localStorage.getItem("token"));

  useEffect(() => {
    getAutoDetail(idAuto, token);
  }, []);

  const handleClickDeleteService = async (e) => {
    console.log("holaaa");
    await deleteService(e.target.value, token);
    await getAutoDetail(idAuto, token);
  };

  const handleClickRenovServi = (e) => {
    setShowRenov(true);
    setIdServ(e.target.value);
  };

  const handleIdServ = (e) => {
    setIdServ(e.target.value);
  };
  console.log(idServ);
  const handleCheckBox = async (e) => {
    setIdServ(e.target.value);
    if(idServ!== undefined){
      await putService(idServ, { serviceStatus: e.target.checked }, token);

    }
  };
  return (
    <Container className="mt-4">
      <div className="d-grid gap-2 mt-2 mb-2">
        <Button onClick={() => setShow(true)} size="lg" variant="info">
          Agregar nuevo service
        </Button>
      </div>
      {autoDetail?.service?.map((serv) => {
        return (
          <Accordion key={serv._id}>
            <Accordion.Item eventKey="0" >
              <Accordion.Header >{serv.servicio}</Accordion.Header>
              <Accordion.Body>
                <Table striped bordered hover size="sm" responsive>
                  <thead>
                    <tr>
                      <th>Categoría</th>
                      <th>Realizado el dia</th>
                      <th>Lugar</th>
                      <th>Proximo service en:</th>
                      <th>Renovar?</th>
                      <th>Fue renovado?</th>
                    </tr>
                  </thead>
                  <tbody>
                    <>
                      <tr>
                        <td>{serv.categoria}</td>
                        <td>{serv.create_at}</td>
                        <td>{serv.lugar}</td>

                        {serv.nextServiceKm -
                          (autoDetail.kilometraje - serv.currentKm) >=
                        10000 ? (
                          <td>
                            <Badge bg="info">
                              {serv.nextServiceKm -
                                (autoDetail.kilometraje - serv.currentKm)}{" "}
                              km
                            </Badge>
                          </td>
                        ) : serv.nextServiceKm -
                            (autoDetail.kilometraje - serv.currentKm) >=
                          5000 ? (
                          <td>
                            <Badge bg="warning">
                              {serv.nextServiceKm -
                                (autoDetail.kilometraje - serv.currentKm)}{" "}
                              km
                            </Badge>
                          </td>
                        ) : (
                          <td>
                            <Badge bg="danger">
                              {serv.nextServiceKm -
                                (autoDetail.kilometraje - serv.currentKm)}{" "}
                              km
                            </Badge>
                          </td>
                        )}
                        <Badge>
                          <Button
                            value={serv._id}
                            onClick={handleClickRenovServi}
                            size="sm"
                            variant="primary"
                          >
                            Renovar
                          </Button>
                        </Badge>
                        <td>
                          <Form>
                            <Form.Check>
                              <Form.Check.Input
                                onChange={handleIdServ}
                                value={serv._id}
                                defaultChecked={serv.serviceStatus}
                                onClick={handleCheckBox}
                              />
                            </Form.Check>
                          </Form>
                        </td>
                      </tr>
                    </>
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      })}

      {show && (
        <ModalNewService show={show} setShow={setShow} idAuto={idAuto} />
      )}
      {showRenov && (
        <ModalRenovService
          show={showRenov}
          setShow={setShowRenov}
          idAuto={idAuto}
          idServ={idServ}
        />
      )}
    </Container>
  );
};
