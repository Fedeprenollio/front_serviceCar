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
  Col,
} from "react-bootstrap";
import { ModalNewService } from "./ModalNewService";
import { ModalRenovService } from "./ModalRenovServ";
import { ImCheckboxUnchecked } from "react-icons/im";
import { FcCheckmark } from "react-icons/fc";
import { FiltersServices } from "./FiltersServices";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const ServicesOneCarTable = ({ idAuto }) => {
  const [show, setShow] = useState(false);
  const [showRenov, setShowRenov] = useState(false);
  const [idServ, setIdServ] = useState();
  const [check, setCheck] = useState();
  const {
    putService,
    getAutoDetail,
    autoDetail,
    deleteService,
    getAutoDetailStatus,
    getAutoDetailDaysNext,
    getAutoDetailKmNext,
  } = useContext(GlobalContext);
  const token = JSON.parse(window.localStorage.getItem("token"));
  useEffect(() => {
    getAutoDetail(idAuto, token);
  }, []);

  const handleClickDeleteService = async (e) => {
    MySwal.fire({
      title: "¿Deseas eliminar a éste service?",
      text: "No prodras revertir la eliminación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteService(e.target.value, token);
        await getAutoDetail(idAuto, token);

        MySwal.fire("Eliminacón correcta!", "", "success");
      }
    });
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
    setCheck(e.target.checked);
  };

  const handleSubmitStatus = async (e) => {
    e.preventDefault();
    const inputOptions = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          true: "Realizado",
          false: "No realizado",
        });
      }, 300);
    });

    const { value: status } = await MySwal.fire({
      title: "Selecciona el estado",
      input: "radio",
      inputOptions: inputOptions,
      inputValidator: (value) => {
        if (!value) {
          return "Necesitas elegir un estado!";
        }
      },
    });

    if (status) {
      MySwal.fire(`Has cambiado el estado`);
      await putService(e.target.value, { serviceStatus: status }, token);
      await getAutoDetail(idAuto, token);
      // await getAutoDetailStatus(idAuto, token, false)
    }
  };

  const [filters, setFilters] = useState({
    status: "",
    category: "",
  });

  const handleStatus = async (e) => {
    setFilters({ ...filters, status: e.target.value });
  };

  const handleCategory = async (e) => {
    setFilters({ ...filters, category: e.target.value });
    // await getAutoDetailStatus(idAuto, token, true, e.target.value)
  };

  const handleFilter = async () => {
    if (filters.status === "all" || filters.category === "all") {
      return await getAutoDetail(idAuto, token);
    }
    await getAutoDetailStatus(idAuto, filters, token);
  };
  const categorias = [
    "Aceite",
    "Neumaticos",
    "Amortiguadores",
    "Frenos",
    "Filtros",
    "Correa del motor",
    "Batería",
    "Escobillas de limpiaparabrisas",
    "Catalizadores y sistemas de escape",
    "Sistema de enfriamiento",
    "Transmisión automática",
    "Otro",
  ];

  //----------------
  const [daysNextService, setDaysNextService] = useState("");
  const handleChangeDays = (e) => {
    setDaysNextService(e.target.value);
  };
  const handleFilterDays = async (e) => {
    if (daysNextService === "") {
      return await getAutoDetail(idAuto, token);
    }
    await getAutoDetailDaysNext(idAuto, daysNextService, token);
  };
  //----------------
  const [kmsNextService, setKmsNextService] = useState("");
  const handleChangeKms = (e) => {
    setKmsNextService(e.target.value);
  };
  const handleFilterKms = async () => {
    if (kmsNextService === "") {
      return await getAutoDetail(idAuto, token);
    }
    await getAutoDetailKmNext(idAuto, kmsNextService, token);
  };
  const handleCleanFilter = async () => {
    return await getAutoDetail(idAuto, token);
  };

  return (
    <Container className=" d-grid gap-2 mt-1 mb-1 container-fluid ">
      <Container className=" d-grid gap-1 mt-1 mb-1 border rounded-2 container-fluid">
        <Row>
          <Col>
            {" "}
            <Form.Label className="mb-0">Filtra por estado</Form.Label>
            <Form.Select onChange={handleStatus}>
              <option value="">Todos</option>
              <option value="false">Pendientes de renovacion</option>
              <option value="true">Renovados</option>
            </Form.Select>
            <Form.Label className="mb-0">Filtra por categoría</Form.Label>
            <Form.Select onChange={handleCategory}>
              <option value="">Todas</option>
              {categorias.map((categoria, i) => {
                return (
                  <option key={i} value={categoria}>
                    {categoria}
                  </option>
                );
              })}
            </Form.Select>
            <Button className="my-2 d-block" onClick={handleFilter}>
              Filtrar
            </Button>
            <Form.Label className="mb-0">
              Filtra por dias hasta el proximo service
            </Form.Label>
            <Form.Select onChange={handleChangeDays}>
              <option value="">Todas</option>
              <option value="30"> Menos de 30 dias </option>
              <option value="60"> Menos de 60 dias </option>
              <option value="90"> Menos de 90 dias </option>
            </Form.Select>
            <Button className="my-2 d-block" onClick={handleFilterDays}>
              Filtrar por dias
            </Button>
          </Col>
          <Col>
            {" "}
       
            <Form.Label className="mb-0">
              Filtra por kilometros hasta el proximo service
            </Form.Label>
            <Form.Select onChange={handleChangeKms}>
              <option value="">Todas</option>
              <option value="500"> Menos de 500 km </option>
              <option value="1000"> Menos de 1000 km </option>
              <option value="3000"> Menos de 3000 km </option>
            </Form.Select>
            <Button className="my-2 d-block" onClick={handleFilterKms}>
              Filtrar por kilometros
            </Button>
          </Col>
        </Row>
            <Button variant="info" className="my-2" onClick={handleCleanFilter}>
              Limpiar filtros
            </Button>
      </Container>
      <Container className="d-grid gap-2 mt-2 mb-2 col-md-6">
        <Button onClick={() => setShow(true)} size="lg" variant="success">
          Agregar nuevo service
        </Button>
      </Container>

      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>{autoDetail.vehiculo} </Accordion.Header>
          <Accordion.Body>
            <Table id="tabla" striped bordered hover size="sm" responsive>
              <thead>
                <tr>
                  <th>Categoría</th>
                  <th>Descripción</th>
                  <th>Detalles</th>
                  <th>Realizado el dia</th>
                  <th>Lugar</th>
                  <th>Proximo service en km:</th>
                  <th>Fecha proximo service en:</th>
                  <th>Renovar?</th>
                  <th>Fue renovado?</th>
                </tr>
              </thead>

              {autoDetail?.service?.map((serv, i) => {
                let day1 = new Date();
                let day2 = new Date(serv.nextServiceFecha);

                var difference = Math.abs(day2 - day1);
                let days = difference / (1000 * 3600 * 24);

                return (
                  <tbody>
                    <>
                      <tr>
                        <td>{serv.categoria}</td>
                        <td>{serv.servicio}</td>
                        <td>{serv.description}</td>
                        <td>
                          {new Date(serv.create_at).getDay()}-
                          {new Date(serv.create_at).getMonth() + 1}-
                          {new Date(serv.create_at).getFullYear()}
                        </td>
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
                        <td className="d-flex">
                          {serv.serviceStatus ? (
                            <FcCheckmark  className="m-1" />
                          ) : (
                            <ImCheckboxUnchecked   className="m-1"/>
                          )}
                          <Button
                            className="mx-4 border-1"
                            value={serv._id}
                            onClick={handleSubmitStatus}
                            variant="success"
                            type="submit"
                          >
                            Cambiar <br/>estado
                          </Button>

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
                        <td>
                          <Button
                            value={serv._id}
                            onClick={handleClickDeleteService}
                            variant="danger"
                          >
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    </>
                  </tbody>
                );
              })}
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

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

// {autoDetail?.service?.map((serv, i) => {
//   let day1 = new Date();
//   let day2 = new Date(serv.nextServiceFecha);

//   var difference = Math.abs(day2 - day1);
//   let days = difference / (1000 * 3600 * 24);

//   {
//   }

//   return (
//     <Accordion key={serv._id}>
//       <Accordion.Item eventKey="0">
//         <Accordion.Header>{serv.servicio} </Accordion.Header>
//         <Accordion.Body>
//           <Table id="tabla" striped bordered hover size="sm" responsive>
//             <thead>
//               <tr>
//                 <th>Categoría</th>
//                 <th>Realizado el dia</th>
//                 <th>Lugar</th>
//                 <th>Proximo service en km:</th>
//                 <th>Fecha proximo service en:</th>
//                 <th>Renovar?</th>
//                 <th>Fue renovado?</th>
//               </tr>
//             </thead>
//             <tbody>
//               <>
//                 <tr>
//                   <td>{serv.categoria}</td>
//                   <td>
//                     {new Date(serv.create_at).getDay()} -{" "}
//                     {new Date(serv.create_at).getMonth() + 1} -{" "}
//                     {new Date(serv.create_at).getFullYear()}{" "}
//                   </td>
//                   <td>{serv.lugar}</td>

//                   {serv.nextServiceKm -
//                     (autoDetail.kilometraje - serv.currentKm) >=
//                   10000 ? (
//                     <td>
//                       <Badge bg="info">
//                         {serv.nextServiceKm -
//                           (autoDetail.kilometraje - serv.currentKm)}{" "}
//                         km
//                       </Badge>
//                     </td>
//                   ) : serv.nextServiceKm -
//                       (autoDetail.kilometraje - serv.currentKm) >=
//                     5000 ? (
//                     <td>
//                       <Badge bg="warning">
//                         {serv.nextServiceKm -
//                           (autoDetail.kilometraje - serv.currentKm)}{" "}
//                         km
//                       </Badge>
//                     </td>
//                   ) : (
//                     <td>
//                       <Badge bg="danger">
//                         {serv.nextServiceKm -
//                           (autoDetail.kilometraje - serv.currentKm)}{" "}
//                         km
//                       </Badge>
//                     </td>
//                   )}
//                   <td>{Math.ceil(days)} dias</td>
//                   <td>
//                     <Badge>
//                       <Button
//                         value={serv._id}
//                         onClick={handleClickRenovServi}
//                         size="sm"
//                         variant="primary"
//                       >
//                         Renovar
//                       </Button>
//                     </Badge>
//                   </td>
//                   <td>
//                     {serv.serviceStatus ? (
//                       <FcCheckmark />
//                     ) : (
//                       <ImCheckboxUnchecked />
//                     )}
//                     <Button
//                       className="mx-4"
//                       value={serv._id}
//                       onClick={handleSubmitStatus}
//                       variant="success"
//                       type="submit"
//                     >
//                       Cambiar estado
//                     </Button>

//                     {/* <Form>
//                       <Form.Check
//                         type="switch"
//                         id="custom-switch"
//                         label="Estado"
//                         defaultChecked={serv.serviceStatus}
//                         onChange={(e)=>console.log(e.target.checked)}

//                       />

//                     </Form> */}
//                   </td>
//                   <td>
//                     <Button
//                       value={serv._id}
//                       onClick={handleClickDeleteService}
//                       variant="danger"
//                     >
//                       Eliminar
//                     </Button>
//                   </td>
//                 </tr>
//               </>
//             </tbody>
//           </Table>
//         </Accordion.Body>
//       </Accordion.Item>
//     </Accordion>
//   );
// })}
