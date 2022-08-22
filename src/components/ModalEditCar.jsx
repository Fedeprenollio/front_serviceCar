import React, { useContext, useEffect } from "react";
import { useFormik, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import { Container, Form, Button, Alert, Modal } from "react-bootstrap";
import { GlobalContext } from "./context/Contex";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)





export const ModalEditCar = ({ idAuto, show, setShow }) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const token = JSON.parse(window.localStorage.getItem("token"));
  const { getAutos, putAuto, getAutoDetail, autoDetail } =
    useContext(GlobalContext);
  useEffect(() => {
    getAutoDetail(idAuto, token);
  }, []);

  const validationSchema = yup.object({
    vehiculo: yup.string().required("El nombre es requerido"),
    model: yup
      .string("Ingrese la descripción")
      .required("La descripción es requerida"),
    kilometraje: yup.number().required("El nombre es requerido"),
  });

  const formik = useFormik({
    initialValues: {
      vehiculo: autoDetail.vehiculo || "",
      model: autoDetail.model || "",
      kilometraje: autoDetail.kilometraje || "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {

      MySwal.fire({
        title: '¿Deseas editar a tu auto?',
        // text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then( async(result) => {
        if (result.isConfirmed) {
  
          await putAuto(idAuto, values, token);
          await getAutos(token);
          await getAutoDetail(idAuto, token);
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

  formik.initialValues.vehiculo = autoDetail.vehiculo;
  formik.initialValues.model = autoDetail.model;
  formik.initialValues.kilometraje = autoDetail.kilometraje;
  return (
    <Container className="mt-4">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editando a "{autoDetail.vehiculo}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik>
            {() => (
              <Form onSubmit={formik.handleSubmit}>
                {/* LUGAR */}

                <Form.Group className="mb-3">
                  <Form.Label>Nombre del vehiculo</Form.Label>
                  <Form.Control
                    id="vehiculo"
                    name="vehiculo"
                    type="text"
                    placeholder="Nombre del auto"
                    value={formik.values.vehiculo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.touched.vehiculo && formik.errors.vehiculo && (
                    <Alert key={"danger"} variant={"danger"}>
                      {formik.errors?.vehiculo}
                    </Alert>
                  )}
                </Form.Group>

                {/* KILOMETROS ACTUALES */}
                <Form.Group className="mb-3">
                  <Form.Label>Modelo</Form.Label>
                  <Form.Control
                    id="model"
                    name="model"
                    type="text"
                    placeholder="Modelo del auto"
                    value={formik.values.model}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.model && formik.errors.model && (
                    <Alert key={"danger"} variant={"danger"}>
                      {formik.errors?.model}
                    </Alert>
                  )}
                  {/* <ErrorMessage name='email' component={()=>(<div>{formik.errors.email}</div>)} /> */}
                  {/* <Form.Text className="text-muted">
                Actualiza su modelo
              </Form.Text> */}
                </Form.Group>

                {/* -----------------NOMBRE */}
                <Form.Group className="mb-3">
                  <Form.Label>Kilometraje actual</Form.Label>
                  <Form.Control
                    id="kilometraje"
                    name="kilometraje"
                    type="text"
                    placeholder="Kilometraje actual"
                    value={formik.values.kilometraje}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.kilometraje && formik.errors.kilometraje && (
                    <Alert key={"danger"} variant={"danger"}>
                      {formik.errors?.kilometraje}
                    </Alert>
                  )}
                </Form.Group>

                <Button variant="primary" type="submit">
                  Guardar cambios
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </Container>
  );
};
