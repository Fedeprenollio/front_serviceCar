import { DELETE_AUTO, GET_AUTOS, GET_DETAIL_CAR, GET_SERVICE_GRAL, LOGIN, POST_AUTO, POST_NEW_SERVICE_CAR, PUT_ASOCIAR_SERVICE_TO_CAR } from './types';

export default function appReducer(state, action) {
	switch (action.type) {
		

			case LOGIN:
				return {
					...state,
					user: action.payload
				}
		
			case POST_AUTO:
				return {
					...state
					
				}
			case GET_AUTOS:
				return {
					...state,
					autos: action.payload
					
				}
			case DELETE_AUTO:
				return {
					...state				
					
				}

			case GET_SERVICE_GRAL:
				return {
					...state,
					servicesGral: action.payload			
					
				}
			case GET_DETAIL_CAR:
				return {
					...state,
					autoDetail: action.payload			
					
				}
			case POST_NEW_SERVICE_CAR:
				return {
					...state,
					// serviceCar: action.payload			
					
				}
			case PUT_ASOCIAR_SERVICE_TO_CAR:
				return {
					...state,
							
					
				}


		

		default:
			return state;
	}
}