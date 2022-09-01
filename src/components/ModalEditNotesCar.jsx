import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { GlobalContext } from './context/Contex';
import { useFormik, Formik, ErrorMessage } from "formik";
import { Container, Form, Button, Alert } from "react-bootstrap";
import * as yup from "yup";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export function ModalEditNotesCar({show, setShow, idAuto}) {
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
  notes: yup.string(),
});

const formik = useFormik({ 
  initialValues: {   
    notes: "",   
  },
  validationSchema: validationSchema,
  onSubmit: async (values) => {

    MySwal.fire({
      title: '¿Deseas cambiar las notas de tu auto?',
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
formik.initialValues.notes= autoDetail.notes
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar las notas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container className="mt-4">
      <h2>Editando a "{autoDetail.vehiculo}"</h2>

      <Formik>
        {() => (
          <Form onSubmit={formik.handleSubmit}>
        

            <Form.Group className="mb-3">
              <Form.Label>Tus notas actuales:</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                id="notes"
                name="notes"
                type="text"
                placeholder="Notas actuales"
                value={formik.values.notes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.notes && formik.errors.notes && (
                <Alert key={"danger"} variant={"danger"}>
                  {formik.errors?.notes}
                </Alert>
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

