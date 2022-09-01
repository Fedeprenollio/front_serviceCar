import { useReducer } from "react";
import { GlobalContext, initialState } from "./Contex";

// import { v4 } from "uuid";
import axios from "axios";
import appReducer from "./AppReducer";

import {
  CLEAR_DETAIL,
  DELETE_AUTO,
  DELETE_SERVICE,
  FILTER_STATUS_SERVICE,
  GET_AUTOS,
  GET_DETAIL_CAR,
  GET_SERVICES_ONE_USER,
  GET_SERVICE_GRAL,
  LOGIN,
  POST_AUTO,
  POST_NEW_SERVICE_CAR,
  PUT_ASOCIAR_SERVICE_TO_CAR,
  PUT_AUTO,
  PUT_SERVICE_CAR,
  SINGUP,
  VERIFY_TOKEN,
} from "./types";

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  //----SIGNUP----
  const postSingup = async (user) => {
    try {
      const res = await axios.post(`http://localhost:3001/singup`, user);
      const data = res.data;
      dispatch({
        type: SINGUP,
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  //-----LOGIN----

  const postLogin = async (user) => {
    try {
      const res = await axios.post(`http://localhost:3001/singin`, user);
      const data = res.data;
      dispatch({
        type: LOGIN,
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const verifyToken = async (token) => {
    const config = {
      headers: { token: token },
    };
    try {
      let response = await axios.get(
        "http://localhost:3001/token/verifyToken",
        config
      );
      console.log(response.data);
      return dispatch({
        type: VERIFY_TOKEN,
        payload: response.data,
      });
    } catch (error) {
      console.log("Usuario no logeado");
      return dispatch({
        type: VERIFY_TOKEN,
        payload: undefined,
      });
    }
  };

  //-----AUTOS

  const postAuto = async (auto, token) => {
    const config = {
      headers: { token: token },
    };
    try {
      const res = await axios.post(`http://localhost:3001/auto`, auto, config);
      const data = res.data;
      dispatch({
        type: POST_AUTO,
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const putAuto = async (idAuto, info, token) => {
    const config = {
      headers: { token: token },
    };
    try {
      const res = await axios.put(
        `http://localhost:3001/auto?idAuto=${idAuto}`,
        info,
        config
      );
      const data = res.data;
      dispatch({
        type: PUT_AUTO,
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getAutos = async (token) => {
    const config = {
      headers: { token: token },
    };
    try {
      const res = await axios.get(`http://localhost:3001/auto/user`, config);
      const data = res.data;

      dispatch({
        type: GET_AUTOS,
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getAutosFilterDays = async (days, token) => {
    const config = {
      headers: { token: token },
    };
    try {
      const res = await axios.get(
        `http://localhost:3001/auto/user/nextServiceDays?day=${days}`,
        config
      );
      const data = res.data;
      dispatch({
        type: GET_AUTOS,
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const getAutosFilterKm = async (km, token) => {
    const config = {
      headers: { token: token },
    };
    try {
      const res = await axios.get(
        `http://localhost:3001/auto/user/nextServiceKm?km=${km}`,
        config
      );
      const data = res.data;
      dispatch({
        type: GET_AUTOS,
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const getAutosStatus = async (status, token) => {
    const config = {
      headers: { token: token },
    };
    try {
      const res = await axios.get(
        `http://localhost:3001/auto/user/status?status=${status}`,
        config
      );
      const data = res.data;
      dispatch({
        type: GET_AUTOS,
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const getAutosCategory = async (category, token) => {
    const config = {
      headers: { token: token },
    };
    try {
      const res = await axios.get(
        `http://localhost:3001/auto/user/category?category=${category}`,
        config
      );
      const data = res.data;
      dispatch({
        type: GET_AUTOS,
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAuto = async (idAuto, token) => {
    const config = {
      headers: { token: token },
    };
    try {
      const res = await axios.delete(
        `http://localhost:3001/auto/${idAuto}`,
        config
      );
      const data = res.data;

      dispatch({
        type: DELETE_AUTO,
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  //------------SERIVES GENERALES

  const getServicesGenerales = async (token) => {
    try {
      const res = await axios.get(`http://localhost:3001/general`);
      const data = res.data;

      dispatch({
        type: GET_SERVICE_GRAL,
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  //-------------- SERVICE DE UN AUTO
  const postNewService = async (info, token) => {
    console.log("info", info)
    const config = {
      headers: { token: token },
    };
    try {
      const res = await axios.post(
        `http://localhost:3001/service`,
        info,
        config
      );
      const data = res.data;

      dispatch({
        type: POST_NEW_SERVICE_CAR,
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const putService = async (idService, info, token) => {
    const config = {
      headers: { token: token },
    };
    try {
      const res = await axios.put(
        `http://localhost:3001/service/${idService}`,
        info,
        config
      );
      const data = res.data;

      dispatch({
        type: PUT_SERVICE_CAR,
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const putAsociarServiceToAuto = async (idAuto, idService, token) => {
    const config = {
      headers: { token: token },
    };
    try {
      const res = await axios.put(
        `http://localhost:3001/auto/addServiceToAuto/${idAuto}`,
        idService,
        config
      );
      const data = res.data;

      dispatch({
        type: PUT_ASOCIAR_SERVICE_TO_CAR,
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const deleteService = async (idService, token) => {
    const config = {
      headers: { token: token },
    };
    try {
      const res = await axios.delete(
        `http://localhost:3001/service/${idService}`,
        config
      );
      const data = res.data;

      dispatch({
        type: DELETE_SERVICE,
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const filterStatusService = async (status, token) => {
    const config = {
      headers: { token: token },
    };
    try {
      const res = await axios.get(
        `http://localhost:3001/service/status?status=${status}`,
        config
      );
      const data = res.data;

      dispatch({
        type: FILTER_STATUS_SERVICE,
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  //------------------------
  const getAutoDetail = async (idAuto, token, status) => {
    const config = {
      headers: { token: token },
    };
    try {
      const res = await axios.get(
        `http://localhost:3001/auto/detail/${idAuto}`,
        config
      );
      const data = res.data;

      dispatch({
        type: GET_DETAIL_CAR,
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const getAutoDetailStatus = async (idAuto, filters, token) => {
    const { status, category } = filters;

    const config = {
      headers: { token: token },
    };
    try {
      const res = await axios.get(
        `http://localhost:3001/auto/detail/${idAuto}?status=${status}&category=${category}`,
        config
      );
      const data = res.data;

      dispatch({
        type: GET_DETAIL_CAR,
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const getAutoDetailDaysNext = async (idAuto, days, token) => {
    const config = {
      headers: { token: token },
    };
    try {
      const res = await axios.get(
        `http://localhost:3001/auto/detailNextDays/${idAuto}?day=${days}`,
        config
      );
      const data = res.data;

      dispatch({
        type: GET_DETAIL_CAR,
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const getAutoDetailKmNext = async (idAuto, km, token) => {
    console.log(km);
    const config = {
      headers: { token: token },
    };
    try {
      const res = await axios.get(
        `http://localhost:3001/auto/detailNextKm/${idAuto}?km=${km}`,
        config
      );
      const data = res.data;

      dispatch({
        type: GET_DETAIL_CAR,
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getServicesOneUser = async (token) => {
    const config = {
      headers: { token: token },
    };
    try {
      const res = await axios.get(`http://localhost:3001/service/user`, config);
      const data = res.data;

      dispatch({
        type: GET_SERVICES_ONE_USER,
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const clearDetail = () => {
    console.log("DETAIL GLOBAL STATE")
    dispatch({
      type: CLEAR_DETAIL,
      
    })
  };
  return (
    <GlobalContext.Provider
      value={{
        postLogin,
        verifyToken,
        userId: state.userId,
        postSingup,
        postAuto,
        getAutos,
        putAuto,
        deleteAuto,
        autos: state.autos,
        getServicesGenerales,
        servicesGral: state.servicesGral,
        postNewService,
        serviceCar: state.serviceCar,
        putAsociarServiceToAuto,
        deleteService,
        getAutoDetail,
        autoDetail: state.autoDetail,
        getServicesOneUser,
        servicesUser: state.servicesUser,
        putService,
        filterStatusService,
        servicesStatus: state.servicesStatus,
        getAutoDetailStatus,
        getAutoDetailDaysNext,
        getAutoDetailKmNext,
        getAutosFilterDays,
        getAutosFilterKm,
        getAutosStatus,
        getAutosCategory,
        clearDetail,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
