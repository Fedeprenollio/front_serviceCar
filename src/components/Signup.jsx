import React, { useContext } from "react";
import { useFormik, Formik } from "formik";
import * as yup from "yup";
import { GlobalContext } from "./context/Contex";

import { SignupLoginGoogle } from "./SignupLoginGoogle";
import { Button, Form, Container } from "react-bootstrap";
import Navbar from "./NavBar";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const Signup = () => {
  const { postSingup } = useContext(GlobalContext);
const navigate = useNavigate()
  const validationSchema = yup.object({
    //email: yup.string().email().required('Email is required'),//
    username: yup.string().required("El nombre es requerido"),
    password: yup
      .string("Ingrese la descripción")
      // .min(8, 'Password should be of minimum 8 characters length')
      .required("La descripción es requerida"),
    repitPassword: yup
      .string("Ingrese la descripción")
      // .min(8, 'Password should be of minimum 8 characters length')
      .required("La confirmacion de contraseña es requerida"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      repitPassword: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values)
      if (values.password === values.repitPassword) {
          const res =  await postSingup(values);
          if(res.status === true){
            MySwal.fire({
              
              icon: 'success',
              title: 'Usuario creado correctamente',
              showConfirmButton: false,
              timer: 1500
            })
            navigate("/panel")
          } else if(res.error){
           
              MySwal.fire({
                
                icon: 'error',
                title: 'Nombre de usuario no disponible',
                showConfirmButton: false,
                timer: 1500
              })
          }

      } else {
        MySwal.fire({
                
          icon: 'error',
          title: 'Tu dos contraseñas no coinciden',
          showConfirmButton: false,
          timer: 1500
        })
      }
    },
  });

  return (
    <Container>
      <Navbar />
      <Formik>
        {() => (
          <Form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control
                id="username"
                name="username"
                type="text"
                placeholder="Nombre"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username && (
                <div>{formik.errors?.username}</div>
              )}
              {/* <ErrorMessage name='email' component={()=>(<div>{formik.errors.email}</div>)} /> */}
              <Form.Text className="text-muted">
                Elije tu nombre de usuario
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Tu contraseña</Form.Label>

              <Form.Control
                id="password"
                name="password"
                // type='password'
                placeholder="Contraseña"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="error">{formik.errors?.password}</div>
              )}
              <Form.Text className="text-muted">
                Elije tu contraseña de usuario
              </Form.Text>
            </Form.Group>


            <Form.Group className="mb-3" >
              <Form.Label>Tu contraseña</Form.Label>

              <Form.Control
                id="repitPassword"
                name="repitPassword"
                // type='password'
                placeholder="Contraseña"
                value={formik.values.repitPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.repitPassword && formik.errors.repitPassword && (
                <div className="error">{formik.errors?.repitPassword}</div>
              )}
              <Form.Text className="text-muted">
                Repite tu contraseña
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Crear
            </Button>
          </Form>
        )}
      </Formik>
      <Container>
        <SignupLoginGoogle />
      </Container>
    </Container>
  );
};
