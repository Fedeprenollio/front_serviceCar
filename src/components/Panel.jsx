import React, { useContext, useEffect, useState } from "react";
import { TusAutos } from "./TusAutos";
import { Container } from "react-bootstrap";
import NavBar from "./NavBar";
import { GlobalContext } from "./context/Contex";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const Panel = () => {
  let navigate = useNavigate();
  const { userId, verifyToken } = useContext(GlobalContext);
  // const [user, setUser] = useState(userId)
  const token = JSON.parse(localStorage.getItem("token"));
console.log("user panel", userId)
  useEffect(() => {
    verifyToken(token);
  
  }, []);

 
    if (userId===undefined) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes estar logueado para ver ésta seccion!",
      });
      navigate("/login");
    }
 

  return (
    <Container>
      <NavBar />
      {userId && <TusAutos userId={userId} />}
    </Container>
  );
};
