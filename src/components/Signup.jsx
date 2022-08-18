import React, { useContext } from "react";
import { useFormik, Formik } from "formik";
import * as yup from "yup";
import { GlobalContext } from "./context/Contex";

import { SignupLoginGoogle } from "./SignupLoginGoogle";
import { Button, Form, Container } from "react-bootstrap";
import Navbar from "./NavBar";

export const Signup = () => {
  const { postSingup } = useContext(GlobalContext);

  const validationSchema = yup.object({
    //email: yup.string().email().required('Email is required'),//
    username: yup.string().required("El nombre es requerido"),
    password: yup
      .string("Ingrese la descripción")
      // .min(8, 'Password should be of minimum 8 characters length')
      .required("La descripción es requerida"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await postSingup(values);
      console.log(values);
    },
  });

  return (
    <Container>
      <Navbar/>
      <Formik>
        {() => (
          <Form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="username">
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

            <Form.Group className="mb-3" controlId="username">
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
          </Form>
        )}
      </Formik>
      <Container>
        <Button variant="primary" type="submit">
          Crar
        </Button>
        <SignupLoginGoogle />
      </Container>
    </Container>
  );
};
