import React, { useContext, useEffect, useState } from "react";
import { TusAutos } from "./TusAutos";
import { Container } from "react-bootstrap";
import NavBar from "./NavBar";
import { GlobalContext } from "./context/Contex";
import { useNavigate } from "react-router-dom";
// import jwt from "jsonwebtoken"

export const Panel = () => {
  let navigate = useNavigate();
  const { userId, verifyToken } = useContext(GlobalContext);
  const [crear, setCrear] = useState(false)

  useEffect(() => {
    const token = JSON.parse(window.localStorage.getItem("token"));
   verifyToken(token);
  }, []);
  
  // if(userId=== null){
  //   navigate("/login")
  // }
  return (
    
    <Container>
      <NavBar />
      <TusAutos />
     
    </Container>
  );
};
