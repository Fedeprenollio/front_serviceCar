import React, { useContext, useEffect, useReducer, useState } from "react";
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
  ToggleButton,
  Form,
} from "react-bootstrap";
import { ModalNewService } from "./ModalNewService";
import { ModalRenovService } from "./ModalRenovServ";
import { ImCheckboxUnchecked } from "react-icons/im"
import { FcCheckmark } from "react-icons/fc"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { FiltersServices } from "./FiltersServices";

const MySwal = withReactContent(Swal)

export const ServicesOneCarTable = ({ idAuto }) => {
  const [show, setShow] = useState(false);
  const [showRenov, setShowRenov] = useState(false);
  const [idServ, setIdServ] = useState();
  const [check, setCheck] = useState();
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

    MySwal.fire({
      title: '¿Deseas eliminar a éste service?',
      text: "No prodras revertir la eliminación",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then( async(result) => {
      if (result.isConfirmed) {

     
        await deleteService(e.target.value, token);
        await getAutoDetail(idAuto, token);

        MySwal.fire(
          'Eliminacón correcta!',
            "",
          'success'
        )
      }
    })




   
  };

  const handleClickRenovServi = async (e) => {
    setShowRenov(true);
    setIdServ(e.target.value);
    await getAutoDetail(idAuto, token);

  };


  const [checked, setChecked] = useState(false);
  const handleIdServ = (e) => {
    setIdServ(e.target.value);
  };

  const handleCheckBox = async (e) => {
    setCheck(e.target.checked)

  };
  const handleSubmitStatus = async (e) => {
    e.preventDefault()

    const inputOptions = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          true: "Realizado",
          false: "No realizado"
        })
      }, 1000)
    })

    const { value: status } = await MySwal.fire({
      title: 'Selecciona el estado',
      input: 'radio',
      inputOptions: inputOptions,
      inputValidator: (value) => {
        if (!value) {
          return 'Necesitas elegir un estado!'
        }
      }
    })

    if (status) {

      MySwal.fire(`Has cambiado el estado`)
      await putService(e.target.value, { serviceStatus: status }, token);
      await getAutoDetail(idAuto, token)

    }

  }
 


  return (
    <Container className="mt-4">
      <FiltersServices/>
      <div className="d-grid gap-2 mt-2 mb-2">
        <Button onClick={() => setShow(true)} size="lg" variant="info">
          Agregar nuevo service
        </Button>
      </div>
      {autoDetail?.service?.map((serv, i) => {

        let day1 = new Date()
        let day2 = new Date(serv.nextServiceFecha)

        var difference = Math.abs(day2 - day1);
        let days = difference / (1000 * 3600 * 24)
       

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
                      <th>Proximo service en km:</th>
                      <th>Fecha proximo service en:</th>
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
                        <td>{Math.ceil(days)} dias</td>
                        <td>
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
                        </td>
                        <td>


                          {serv.serviceStatus ? <FcCheckmark /> : <ImCheckboxUnchecked />}
                          <Button className="mx-4" value={serv._id} onClick={handleSubmitStatus} variant="success" type="submit" >Cambiar estado</Button>


                          {/* <Form>
                            <Form.Check
                              type="switch"
                              id="custom-switch"
                              label="Estado"
                              defaultChecked={serv.serviceStatus}
                              onChange={(e)=>console.log(e.target.checked)}
                              
                            />
                        
                          </Form> */}

                        </td>
                        <td><Button value={serv._id} onClick={handleClickDeleteService} variant="danger">Eliminar</Button></td>

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
