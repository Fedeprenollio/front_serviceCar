import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { GlobalContext } from './context/Contex';
import { useFormik, Formik, ErrorMessage } from "formik";
import { Container, Form, Button, Alert } from "react-bootstrap";
import * as yup from "yup";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export function ModalEditKm({show, setShow, idAuto}) {
  const token = JSON.parse(window.localStorage.getItem("token"));
  // const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




  useEffect(()=>{
    getAutoDetail(idAuto,token)
 
     },[])
 
  const {
      getAutos,
      putAuto,        
      getAutoDetail,
      autoDetail    
    } = useContext(GlobalContext);

const validationSchema = yup.object({ 
  kilometraje: yup.number().required("El kilometraje es requerido"),
});

const formik = useFormik({ 
  initialValues: {   
    kilometraje: "",   
  },
  validationSchema: validationSchema,
  onSubmit: async (values) => {

    MySwal.fire({
      title: '¿Deseas cambiar los kilometros?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then( async(result) => {
      if (result.isConfirmed) {

        await putAuto(idAuto,values, token );
     await getAutos(token);
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
formik.initialValues.kilometraje= autoDetail.kilometraje
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar los kilometros</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container className="mt-4">
      <h2>Editando a "{autoDetail.vehiculo}"</h2>

      <Formik>
        {() => (
          <Form onSubmit={formik.handleSubmit}>
        

            <Form.Group className="mb-3">
              <Form.Label>Coloca su kilometraje actual</Form.Label>
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
                <div style={{color:"red"}}>
                  {formik.errors?.kilometraje}
                </div>
              )}
              
              
            </Form.Group>

         
            <Button  variant="primary" type="submit">
              Guardar cambios
            </Button>
          </Form>
        )}
      </Formik>
    </Container>


        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

