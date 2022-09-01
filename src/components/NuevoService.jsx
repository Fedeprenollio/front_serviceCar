import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./context/Contex";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFormik, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import { Container, Form, Button, Alert } from "react-bootstrap";

export const NuevoService = ({ idAuto, idService }) => {
  const token = JSON.parse(window.localStorage.getItem("token"));
  useEffect(() => {
    getAutoDetail(idAuto, token);
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
  } = useContext(GlobalContext);

  const serviceSelect = servicesGral.find((s) => s._id === idService);

  const validationSchema = yup.object({
    //email: yup.string().email().required('Email is required'),//
    // fecha: yup.string().required("El nombre es requerido"),
    lugar: yup.string().required("El nombre es requerido"),
    description: yup.string(),
    currentKm: yup
      .number("Ingrese la descripción")
      .required("La descripción es requerida"),
    servicio: yup.string().required("El nombre es requerido"),
    // categoria: yup.string().required("El nombre es requerido"),
    // nextServiceKm: yup.number().required("El nombre es requerido"),
    // nextServiceFecha: yup.string().required("El nombre es requerido"),
  });

  const formik = useFormik({
    initialStatus: {
      currentKm: autoDetail?.vehiculo,
    },
    initialValues: {
      // fecha: "",
      lugar: "",
      description:"",
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
          categoria: select,
          create_at: startDate,
          nextServiceFecha: startDateNext,
        },
        token
      );
      await putAsociarServiceToAuto(idAuto, { service: newService._id }, token);
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
  console.log("fecha", startDate);
  console.log("siguiente service", startDateNext);
  return (
    <Container className="mt-4">
      <Container className="">
        <h2>
          Nuevo service: {autoDetail?.vehiculo}, actualmete{" "}
          {autoDetail.kilometraje} km{" "}
        </h2>
        <select onChange={handleSelect} name="" id="">
          <option selected disabled>
            Selecciona una categoría
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
                <Alert key={"danger"} variant={"danger"}>
                  {formik.errors?.lugar}
                </Alert>
              )}
              {/* <Form.Text className="text-muted">
                Elije tu nombre de usuario
              </Form.Text> */}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                id="description"
                name="description"
                type="text"
                placeholder="Notas del service"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.description && formik.errors.description && (
                <Alert key={"danger"} variant={"danger"}>
                  {formik.errors?.description}
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
                type="text"
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
                Por defecto aparacen los kilometros actuales, tu podras editarlos.
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
                Elije tu nombre de usuario
              </Form.Text>
            </Form.Group>

            {/* PROXIMO SERICE EN KM */}
            {/* <Form.Group className="mb-3">
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
            </Form.Group> */}

            <Datepicker
              dateFormat="dd/MM/yyyy"
              className="mt-3"
              selected={startDateNext}
              onChange={(date) => setStartDateNext(date)}
            />
            <label>Fecha del proximo service</label>

            <Button variant="primary" type="submit">
              Crear
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
