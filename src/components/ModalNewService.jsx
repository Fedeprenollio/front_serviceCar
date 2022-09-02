import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./context/Contex";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFormik, Formik } from "formik";
import * as yup from "yup";
import { Container, Form, Button,  Modal } from "react-bootstrap";

export const ModalNewService = ({ show, setShow, idAuto, idService }) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const token = JSON.parse(window.localStorage.getItem("token"));
  useEffect(() => {
    getAutoDetail(idAuto, token);
  }, [idAuto]);

  const [select, setSelect] = useState("Otro");

  const {
    postNewService,
    putAsociarServiceToAuto,
    getAutoDetail,
    servicesGral,
    autoDetail,
  } = useContext(GlobalContext);

  const serviceSelect = servicesGral.find((s) => s._id === idService);

  const validationSchema = yup.object({
    //email: yup.string().email().required('Email is required'),//
    // fecha: yup.string().required("El nombre es requerido"),
    lugar: yup.string(),
    description: yup.string(),
    currentKm: yup
      .number("Ingrese los kilometros actuales")
      .required("Los kilometros actuales son requeridos"),
    servicio: yup.string().required("El nombre es requerido"),
    // categoria: yup.string().required("El nombre es requerido"),
    nextServiceKm: yup.number().required("Los kilometros para el siguiente service son requeridos"),
    // nextServiceFecha: yup.string().required("El nombre es requerido"),
  });

  const formik = useFormik({
    initialStatus: {
      currentKm: autoDetail?.vehiculo,
    },
    initialValues: {
      // fecha: "",
      lugar: "",
      description: "",
      currentKm: "",
      servicio: "",
      nextServiceKm: "",
      // nextServiceFecha: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const newService = await postNewService(
        {
          ...values,
          categoria: select ,
          create_at: startDate,
          nextServiceFecha: startDateNext,
        },
        token
      );
      await putAsociarServiceToAuto(idAuto, { service: newService._id }, token);
      setShow(false)
      await getAutoDetail(idAuto, token);
    },
  });
  formik.initialValues.currentKm = autoDetail.kilometraje;

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
          <Modal.Title>Agregando nuevo service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className="">
            <h3>
             Nuevo service:  <b>{autoDetail?.vehiculo}</b>, actualmete{" "}
              {autoDetail.kilometraje} km{" "}
            </h3>
            <select onChange={handleSelect} name="" id="">
              <option selected disabled>
                Selecciona una categoría
              </option>
              {categorias.map((c,i) => {
                return (
                  <option key={i} value={c}>
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

            {/* <select onChange={(date) => setStartDateNext(date)} name="" id=""> */}
            {/* <select onChange={(e)=> console.log(e.target.value)} name="" id="">
            <option value="1">1 año</option>
            <option value="2">2 año</option>
            <option value="">3 año</option>
            <option value="">4 año</option>
            <option value="">5 año</option>
          </select> */}
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
                    <div style={{color:"red"}}>
                      {formik.errors?.lugar}
                    </div>
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
                    type="text"
                    placeholder="Kilometros actuales"
                    value={formik.values.currentKm}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.currentKm && formik.errors.currentKm && (
                    <div style={{color:"red"}}>
                      {formik.errors?.currentKm}
                    </div>
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
                    <div style={{color:"red"}}>
                      {formik.errors?.servicio}
                    </div>
                  )}
                  {/* <ErrorMessage name='email' component={()=>(<div>{formik.errors.email}</div>)} /> */}
                  <Form.Text className="text-muted">
                    Nombre del service que le hicieron
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    id="description"
                    name="description"
                    type="text"
                    placeholder="Nuevo sevice"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div style={{color:"red"}}>
                      {formik.errors?.description}
                    </div>
                  )}
                  <Form.Text className="text-muted">
                    Puedes informar marca y tipo de aceite, liquido de frno, marca de pastillas de frenos, etc
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
                    <div style={{color:"red"}}>
                      {formik.errors?.nextServiceKm}
                    </div>
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
                  <Button variant="primary" type="submit">
                    Crear
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
