import { GoogleLogin } from "@react-oauth/google";
import React, { useContext } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "./context/Contex";

export const SignupLoginGoogle = () => {
  const {  verifyToken} = useContext(GlobalContext);

  const navigate = useNavigate();

  //------singup google/login google
  const handleLoginGoogle = async (res) => {
    const user = await jwt_decode(res.credential);
    const response = await axios.post("http://localhost:3001/singupGoogle", {
      token: res,
    });

    if (response !== undefined) {
      window.localStorage.setItem("token", JSON.stringify(response.data.token));
      const token = JSON.parse(localStorage.getItem("token"));
      const user = await verifyToken(token);
      navigate("/panel");
    }
  };
  return (
    <div>
      <GoogleLogin
        // buttonText="Logeate con Google"
        onSuccess={handleLoginGoogle}
        onError={handleLoginGoogle}
        //
      />
    </div>
  );
};
