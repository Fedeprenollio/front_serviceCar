import { useContext, useEffect, useState } from "react";
import {
  Table,
  Form,
  Accordion,
  Badge,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { GlobalContext } from "./context/Contex";
import NavBar from "./NavBar";
import { ImCheckboxUnchecked } from "react-icons/im";
import { FcCheckmark } from "react-icons/fc";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ModalRenovService } from "./ModalRenovServ";
import { ModalEditService } from "./ModalEditService";
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal);

export function AdminService() {
  const navigate = useNavigate();
  const token = JSON.parse(window.localStorage.getItem("token"));

  const {
    verifyToken,
    userId,
    getAutos,
    autos,
    getAutoDetail,
    getAutosFilterDays,
    getAutosFilterKm,
    getAutosStatus,
    getAutosCategory,
    deleteService,
    clearDetail,
    putService,
  } = useContext(GlobalContext);
  useEffect(() => {
    verifyToken(token);
    getAutos(token);
    return () => {
      clearDetail();
    };
  }, []);

  if (userId === undefined) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Debes estar logueado para ver ésta seccion!",
    });
    navigate("/login");
  }

  // let autoSelect = undefined;
  // const handleChangeAuto = async (e) => {
  //   console.log(e.target.value);
  //   autoSelect = await getAutoDetail(e.target.value, token);
  //   console.log(autoSelect);
  // };
  //---------------------filtros
  // const [filters, setFilters] = useState({
  //   status: "",
  //   category: "",
  // });

  // const handleStatus = async (e) => {
  //   setFilters({ ...filters, status: e.target.value });

  // };

  //---------------------filtros por estado

  const [status, setStatus] = useState("");

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmitStatus = async () => {
    if (status === "") {
      return await getAutos(token);
    }
    await getAutosStatus(status, token);
  };

  // const handleFilter = async () => {
  //   if (filters.status === "all" || filters.category === "all") {
  //     return await getAutos( token);
  //   }
  //   await getAutosStatus( status, token);
  // };
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
  //
  //------------- filtro categoria
  const [category, setCategory] = useState("");

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
    // await getAutoDetailStatus(idAuto, token, true, e.target.value)
  };

  const handleSubmitCategory = async () => {
    if (category === "") {
      return await getAutos(token);
    }
    await getAutosCategory(category, token);
  };

  //---------------- filtro por dia
  const [daysNextService, setDaysNextService] = useState("");
  const handleChangeDays = (e) => {
    setDaysNextService(e.target.value);
  };
  const handleFilterDays = async () => {
    if (daysNextService === "") {
      return await getAutos(token);
    }
    await getAutosFilterDays(daysNextService, token);
  };
  //---------------- filtro por km
  const [kmsNextService, setKmsNextService] = useState("");
  const handleChangeKms = (e) => {
    setKmsNextService(e.target.value);
  };
  const handleFilterKms = async () => {
    if (kmsNextService === "") {
      return await getAutos(token);
    }
    await getAutosFilterKm(kmsNextService, token);
  };
  const handleCleanFilter = async () => {
    return await getAutos(token);
  };

  //----------eliminar servicio
  const [idServ, setIdServ] = useState("");
  const handleDeleteService = async (e) => {
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
        await getAutos(token);

        MySwal.fire("Eliminacón correcta!", "", "success");
      }
    });
  };

  //--------editar un servicio
  const [showEditService, setShowEditService] = useState(false);
  const handleClickEditService = (e) => {
    setIdServ(e.target.value);
    setShowEditService(true);
  };
  //-----------renovar un service
  const [showRenov, setShowRenov] = useState(false);
  const [idAuto, setIdAuto] = useState("");
  const handleClickRenovServi = (e) => {
    //-------find auto a renovar
    const autoFind = autos?.find((a) =>
      a?.service?.filter((serv) => serv?._id === e.target.value)
    );
    setIdAuto(autoFind?._id);
    setIdServ(e.target.value);
    setShowRenov(true);
  };

  //-----Manejar (cambiar) el status de un service
  const handleChangeStatus = async (e) => {
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
      await getAutos(token);
      // await getAutoDetail(idAuto, token);
      // await getAutoDetailStatus(idAuto, token, false)
    }
  };

  return (
    <>
      <NavBar />
      <Container className=" d-grid gap-1 my-3 border rounded-2  container-fluid">
        <Row>
          <Col>
            <Form.Label className="mb-0">Filtra por estado</Form.Label>
            <Form.Select onChange={handleStatus}>
              <option value="">Todos</option>
              <option value="false">Pendientes de renovacion</option>
              <option value="true">Renovados</option>
            </Form.Select>
            <Button className="my-2 d-block" onClick={handleSubmitStatus}>
              Filtrar por estado
            </Button>

            <Form.Label className="mb-0">Filtra por categoría</Form.Label>
            <Form.Select onChange={handleChangeCategory}>
              <option value="">Todas</option>
              {categorias.map((categoria, i) => {
                return (
                  <option key={i} value={categoria}>
                    {categoria}
                  </option>
                );
              })}
            </Form.Select>
            <Button className="my-2 d-block" onClick={handleSubmitCategory}>
              Filtrar categoria
            </Button>
          </Col>

          <Col>
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

        <Button variant="info" className="my-2 d-block" onClick={handleCleanFilter}>
          Limpiar filtros
        </Button>
      </Container>
      <Container>
      <h3>Tus autos:</h3>
      {autos.map((auto) => {
        return (
          <Accordion key={auto._id}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>{auto.vehiculo}</Accordion.Header>
              <Accordion.Body>
                <Table striped bordered hover size="sm" responsive>
                  <thead>
                    <tr>
                      <th>Categoría</th>
                      <th>Mantenimiento</th>
                      <th>Notas</th>
                      <th>Realizado el dia</th>
                      <th>Lugar</th>
                      <th>Debes ir al taller dentro de:</th>
                      <th>Dias faltantes:</th>
                      <th>Fue renovado?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auto.service.map((s) => {
                      let day1 = new Date();
                      let day2 = new Date(s.nextServiceFecha);

                      var difference = Math.abs(day2 - day1);
                      let days = difference / (1000 * 3600 * 24);
                      return (
                        <tr key={s._id}>
                          <td>{s.categoria}</td>
                          <td>{s.servicio}</td>
                          <td>{s.description}</td>
                          <td>
                            {new Date(s.create_at).getDay()} -{" "}
                            {new Date(s.create_at).getMonth() + 1} -{" "}
                            {new Date(s.create_at).getFullYear()}{" "}
                          </td>

                          <td>{s.lugar}</td>

                          {s.nextServiceKm - (auto.kilometraje - s.currentKm) >=
                          10000 ? (
                            <td>
                              <Badge bg="info">
                                {s.nextServiceKm -
                                  (auto.kilometraje - s.currentKm)}{" "}
                                km
                              </Badge>
                            </td>
                          ) : s.nextServiceKm -
                              (auto.kilometraje - s.currentKm) >=
                            5000 ? (
                            <td>
                              <Badge bg="warning">
                                {s.nextServiceKm -
                                  (auto.kilometraje - s.currentKm)}{" "}
                                km
                              </Badge>
                            </td>
                          ) : (
                            <td>
                              <Badge bg="danger">
                                {s.nextServiceKm -
                                  (auto.kilometraje - s.currentKm)}{" "}
                                km
                              </Badge>
                            </td>
                          )}
                          <td>{Math.ceil(days)} dias</td>
                          <td  className="d-flex" >
                            {s.serviceStatus ? (
                              <FcCheckmark className="m-1" />
                            ) : (
                              <ImCheckboxUnchecked className="m-1" />
                            )}
                            <Button
                            className="border-1"
                              
                              value={s._id}
                              onClick={handleChangeStatus}
                              variant="success"
                              type="submit"
                            >
                              Cambiar <br/> estados
                            </Button>
                          </td>
                          <td>
                            <Button
                              type="submit"
                              value={s._id}
                              onClick={handleClickRenovServi}
                              className="m-1"
                            >
                              Renovar
                            </Button>
                            <Button
                              type="submit"
                              value={s._id}
                              onClick={handleClickEditService}
                              className="m-1"
                            >
                              Editar
                            </Button>
                            <Button
                              type="submit"
                              value={s._id}
                              onChange={handleDeleteService}
                              className="m-1"
                            >
                              Eliminar
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      })}
      </Container>
      {showEditService && (
        <ModalEditService
          show={showEditService}
          setShow={setShowEditService}
          // idAuto={idAuto}
          idServ={idServ}
        />
      )}
      {showRenov && (
        <ModalRenovService
          show={showRenov}
          setShow={setShowRenov}
          idAuto={idAuto}
          idServ={idServ}
        />
      )}
    </>
  );
}
