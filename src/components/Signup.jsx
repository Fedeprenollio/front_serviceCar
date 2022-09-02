import React, { useContext, useState } from "react";
import { useFormik, Formik } from "formik";
import * as yup from "yup";
import { GlobalContext } from "./context/Contex";
import { SignupLoginGoogle } from "./SignupLoginGoogle";
import { Button, Form, Container } from "react-bootstrap";
import Navbar from "./NavBar";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const Signup = () => {
  const { postSingup, verifyToken, user, postLogin } =
    useContext(GlobalContext);

  const navigate = useNavigate();
  const validationSchema = yup.object({
    //email: yup.string().email().required('Email is required'),//
    username: yup
      .string()
      .required("El nombre de usuario es requerido")
      .min(8, "El nombre debe tener al menos 8 caracteres"),
    password: yup
      .string("Ingrese el password")
      .min(8, "El password debe tener al menos 8 caracteres")
      .required("La contraseña es requerida"),
    repitPassword: yup
      .string("Ingrese el password")
      .min(8, "El password debe tener al menos 8 caracteres")
      .required("La confirmacion de contraseña es requerida"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      repitPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (values.password === values.repitPassword) {
        const res = await postSingup(values);
        if (res.status === true) {
          MySwal.fire({
            icon: "success",
            title: "Usuario creado correctamente",
            showConfirmButton: false,
            timer: 1500,
          });

          const res = await postLogin(values);
          if (res !== undefined) {
            window.localStorage.setItem("token", JSON.stringify(res.token));
            const token = JSON.parse(window.localStorage.getItem("token"));
            const user = await verifyToken(token);
            navigate("/panel");
          }
        } else if (res.error) {
          MySwal.fire({
            icon: "error",
            title: "Nombre de usuario no disponible o ya utilizado",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        MySwal.fire({
          icon: "error",
          title: "Tu dos contraseñas no coinciden",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const clickShowPassword = () => {
    let tipo = document.getElementById("password");
    if (tipo.type == "password") {
      tipo.type = "text";
      setShowPassword(true);
    } else {
      tipo.type = "password";
      setShowPassword(false);
    }
  };
  const clickShowPasswordRepit = () => {
    let tipo = document.getElementById("repitPassword");
    if (tipo.type == "password") {
      tipo.type = "text";
      setShowPassword(true);
    } else {
      tipo.type = "password";
      setShowPassword(false);
    }
  };
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
                <div style={{ color: "red" }}>{formik.errors?.username}</div>
              )}
              {/* <ErrorMessage name='email' component={()=>(<div>{formik.errors.email}</div>)} /> */}
              <Form.Text className="text-muted">
                Elije tu nombre de usuario
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tu contraseña</Form.Label>
              <span type="button" onClick={clickShowPassword}>
                {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
              </span>
              <Form.Control
                id="password"
                name="password"
                type="password"
                placeholder="Contraseña"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div style={{ color: "red" }} className="error">
                  {formik.errors?.password}
                </div>
              )}
              <Form.Text className="text-muted">
                Elije tu contraseña de usuario
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tu contraseña</Form.Label>
              <span type="button" onClick={clickShowPasswordRepit}>
                {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
              </span>
              <Form.Control
                id="repitPassword"
                name="repitPassword"
                type="password"
                placeholder="Contraseña"
                value={formik.values.repitPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.repitPassword && formik.errors.repitPassword && (
                <div style={{ color: "red" }} className="error">
                  {formik.errors?.repitPassword}
                </div>
              )}
              <Form.Text className="text-muted">Repite tu contraseña</Form.Text>
            </Form.Group>
            <Container className="d-grid place-item-center gap-2">
              <Button variant="primary" type="submit">
                Crear
              </Button>
              <SignupLoginGoogle />
            </Container>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
