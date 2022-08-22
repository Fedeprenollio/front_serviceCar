import React, { useContext, useState } from "react";
import { GlobalContext } from "./context/Contex";
import NavBar from "./NavBar";
import { SignupLoginGoogle } from "./SignupLoginGoogle";
import { useFormik, Formik } from "formik";
import * as yup from "yup";
import { Button, Form, Container } from "react-bootstrap";
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';


export const Login = () => {
  const { postLogin } = useContext(GlobalContext);
  const [showPassword, setShowPassword] = useState(false);



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
      const res = await postLogin(datos);
      if (res !== undefined) {
        window.localStorage.setItem("token", JSON.stringify(res.token));
        const ls = JSON.parse(localStorage.getItem("token"));
      }
    },
  });

  const clickShowPassword = () => {
    let tipo = document.getElementById('password');
    if (tipo.type == 'password') {
      tipo.type = 'text';
      setShowPassword(true);
    } else {
      tipo.type = 'password';
      setShowPassword(false);
    }
  };




  return (
    <Container>
      <NavBar />
      {/* <form onSubmit={handleSubmit} >
        <input onChange={handleChange} name="username" type="text" placeholder='tu usuario' />
        <input onChange={handleChange} name="password" type="text" placeholder='Tu contraseña'/>
        <button type='submit'>Login</button>
      </form> */}
      <Formik>
        {() => (
          <Form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3" >
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
              {/* <Form.Text className="text-muted">
                Elije tu nombre de usuario
              </Form.Text> */}
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Tu contraseña</Form.Label>
              <span type='button' onClick={clickShowPassword}>
              {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
            </span>
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
              {/* <Form.Text className="text-muted">
                Elije tu contraseña de usuario
              </Form.Text> */}
            </Form.Group>
          
          </Form>
        )}
      </Formik>
      <Container >
        <Button variant="primary" type="submit">
          Ingresar
        </Button>
        <SignupLoginGoogle />
      </Container>
    </Container>
  );
};
