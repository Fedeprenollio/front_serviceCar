import { useReducer } from 'react';
import { GlobalContext, initialState } from './Contex';

// import { v4 } from "uuid";
import axios from 'axios';
import appReducer from './AppReducer';

import { DELETE_AUTO, DELETE_SERVICE, GET_AUTOS, GET_DETAIL_CAR, GET_SERVICES_ONE_USER, GET_SERVICE_GRAL, LOGIN, POST_AUTO, POST_NEW_SERVICE_CAR, PUT_ASOCIAR_SERVICE_TO_CAR, PUT_AUTO, PUT_SERVICE_CAR, SINGUP, VERIFY_TOKEN } from './types';

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(appReducer, initialState);

	//----SIGNUP----
	const postSingup= async user => {
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

	const postLogin = async user => {
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


	const verifyToken =  async(token) => {
		
		  const config = {
			headers: { token: token },
		  };
		  try {
			let response = await axios.get("http://localhost:3001/token/verifyToken", config);
			return dispatch({
			  type: VERIFY_TOKEN,
			  payload: response.data,
			});
		  } catch (error) {
			
			console.log("Usuario no logeado");
			
		  }
	
	  };
	  



	//-----AUTOS

	const postAuto = async (auto, token) => {
		const config = {
			headers: { token:  token },
		};
		try {
			const res = await axios.post(`http://localhost:3001/auto`,auto, config);
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
	const putAuto = async (idAuto, info ,token) => {
		console.log(info)
		const config = {
			headers: { token:  token },
		};
		try {
			const res = await axios.put(`http://localhost:3001/auto?idAuto=${idAuto}`,info, config);
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



	const getAutos = async token => {
		const config = {
			headers: { token:  token },
		  };
		try {
			const res = await axios.get(`http://localhost:3001/auto/user`,config);
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
			headers: { token:  token },
		  };
		try {
			const res = await axios.delete(`http://localhost:3001/auto/${idAuto}`,config);
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

const getServicesGenerales = async token => {
	
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
	const config = {
		headers: { token:  token },
	  };
	try {
		const res = await axios.post(`http://localhost:3001/service`,info, config);
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
const putService = async (idService,info, token) => {
	
	console.log("soy la id", idService)
	console.log("soy la ingo", info)
	const config = {
		headers: { token:  token },
	  };
	try {
		const res = await axios.put(`http://localhost:3001/service/${idService}`,info, config);
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

const putAsociarServiceToAuto = async (idAuto ,idService,token) => {
	const config = {
		headers: { token:  token },
	  };
	try {
		const res = await axios.put(`http://localhost:3001/auto/addServiceToAuto/${idAuto}`,idService, config);
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
const deleteService = async (idService,token) => {
	console.log("idser",idService)
	const config = {
		headers: { token:  token },
	  };
	try {
		const res = await axios.delete(`http://localhost:3001/service/${idService}`, config);
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

const getAutoDetail = async (idAuto, token) => {
	const config = {
		headers: { token:  token },
	  };
	try {
		const res = await axios.get(`http://localhost:3001/auto/detail/${idAuto}`,config );
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

const getServicesOneUser = async token => {
	const config = {
		headers: { token:  token },
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
				putService

				
				
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};