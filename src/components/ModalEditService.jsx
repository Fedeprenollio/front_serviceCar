import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./context/Contex";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFormik, Formik } from "formik";
import * as yup from "yup";
import { Container, Form, Button, Alert, Modal } from "react-bootstrap";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)



export const ModalEditService = ({ show, setShow, idAuto,idServ }) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const token = JSON.parse(window.localStorage.getItem("token"));
  useEffect(() => {
    getAutoDetail(idAuto, token);
    getServicesOneUser(token)
    setSelect(oldService?.categoria)
  }, [idAuto]);

  const [select, setSelect] = useState({
    categoria: "",
  });
  const {
    postNewService,
    putAsociarServiceToAuto,
    getAutoDetail,
    servicesGral,
    autoDetail,
    servicesUser,
    getServicesOneUser,
    putService,
    getAutos
    
  } = useContext(GlobalContext);
  const oldService = servicesUser.find(ser => ser._id=== idServ)

  const validationSchema = yup.object({
    //email: yup.string().email().required('Email is required'),//
    // fecha: yup.string().required("El nombre es requerido"),
    lugar: yup.string().required("El nombre es requerido"),
    currentKm: yup
      .number("Ingrese la descripción")
      .required("La descripción es requerida"),
    servicio: yup.string().required("El nombre es requerido"),
    // categoria: yup.string().required("El nombre es requerido"),
    nextServiceKm: yup.number().required("El nombre es requerido"),
    // nextServiceFecha: yup.string().required("El nombre es requerido"),
  });     


  const formik = useFormik({
    // initialStatus: {
    //   currentKm: autoDetail?.vehiculo,
    // },
    initialValues: {
      // fecha: "",
      lugar: "",
      currentKm: "",
      servicio: "",
      nextServiceKm: "",
      // nextServiceFecha: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
        MySwal.fire({
            title: '¿Deseas editar?',
            // text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si'
          }).then( async(result) => {
            if (result.isConfirmed) {
      
                await putService(idServ, values, token)
                await getAutos( token);
           setShow(false)
      
              MySwal.fire(
                'Actualización correcta!',
                  "",
                'success'
              )
            }
          })

      
    },
  });


  formik.initialValues.currentKm = autoDetail.kilometraje;
  formik.initialValues.servicio = oldService?.servicio;
  formik.initialValues.lugar = oldService?.lugar;
  formik.initialValues.currentKm = oldService?.currentKm;
  formik.initialValues.nextServiceKm = oldService?.nextServiceKm;
  // select.categoria = oldService?.categoria

  const handleSelect = (e) => {
    setSelect(e.target.value);
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

  const [startDate, setStartDate] = useState(new Date());
  const [startDateNext, setStartDateNext] = useState(new Date());
 
  return (
    <Container className="mt-4">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editando el service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className="">
            {/* <h2>
              Nuevo service: {autoDetail?.vehiculo}, actualmete{" "}
              {autoDetail.kilometraje} km{" "}
            </h2> */}
            <select onChange={handleSelect} name="" id="">
              <option  disabled>
                Selecciona una categoría
              </option>
              <option value={oldService?.categoria} selected>
                {oldService?.categoria}
              </option>
              {categorias.map((c) => {
                return (
                  <option key={c} value={c}>
                    {c}
                  </option>
                );
              })}
            </select>
            <Datepicker
              dateFormat="dd/MM/yyyy"
              placeholder="Fecha del service"
              className="mt-3"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <label>Fecha del service</label>

           
          </Container>

          <Formik>
            {() => (
              <Form onSubmit={formik.handleSubmit}>
                {/* LUGAR */}

                <Form.Group className="mb-3">
                  <Form.Label>Lugar</Form.Label>
                  <Form.Control
                    id="lugar"
                    name="lugar"
                    type="text"
                    placeholder="Lugar del sevice"
                    value={formik.values.lugar}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.touched.lugar && formik.errors.lugar && (
                    <Alert key={"danger"} variant={"danger"}>
                      {formik.errors?.lugar}
                    </Alert>
                  )}
                  {/* <Form.Text className="text-muted">
                Elije tu nombre de usuario
              </Form.Text> */}
                </Form.Group>

                {/* KILOMETROS ACTUALES */}
                <Form.Group className="mb-3">
                  <Form.Label>Kilometros en el momento del service</Form.Label>
                  <Form.Control
                    id="currentKm"
                    name="currentKm"
                    type="number"
                    placeholder="Kilometros actuales"
                    value={formik.values.currentKm}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.currentKm && formik.errors.currentKm && (
                    <Alert key={"danger"} variant={"danger"}>
                      {formik.errors?.currentKm}
                    </Alert>
                  )}
                  {/* <ErrorMessage name='email' component={()=>(<div>{formik.errors.email}</div>)} /> */}
                  <Form.Text className="text-muted">
                    Por defecto aparacen los kilometros actuales, tu podras
                    editarlos.
                  </Form.Text>
                </Form.Group>

                {/* -----------------NOMBRE */}
                <Form.Group className="mb-3">
                  <Form.Label>Que service hicieron</Form.Label>
                  <Form.Control
                    id="servicio"
                    name="servicio"
                    type="text"
                    placeholder="Nuevo sevice"
                    value={formik.values.servicio}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.servicio && formik.errors.servicio && (
                    <Alert key={"danger"} variant={"danger"}>
                      {formik.errors?.servicio}
                    </Alert>
                  )}
                  {/* <ErrorMessage name='email' component={()=>(<div>{formik.errors.email}</div>)} /> */}
                  <Form.Text className="text-muted">
                    Puedes resumir el service
                  </Form.Text>
                </Form.Group>

                {/* PROXIMO SERICE EN KM */}
                <Form.Group className="mb-3">
                  <Form.Label>Proximo service en kilometros</Form.Label>

                  <Form.Control
                    id="nextServiceKm"
                    name="nextServiceKm"
                    // type='password'
                    placeholder="Proximo service en kilometros"
                    value={formik.values.nextServiceKm}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.nextServiceKm && formik.errors.nextServiceKm && (
                    <Alert key={"danger"} variant={"danger"}>
                      {formik.errors?.nextServiceKm}
                    </Alert>
                  )}
                </Form.Group>

                <Datepicker
                  dateFormat="dd/MM/yyyy"
                  className="mt-3"
                  selected={startDateNext}
                  onChange={(date) => setStartDateNext(date)}
                />
                <label>Fecha del proximo service</label>
                <div className="d-grid gap-2 mt-2 mb-2">
                <Button  variant="primary" type="submit">
                  Editar
                </Button>

                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Aceptar
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
