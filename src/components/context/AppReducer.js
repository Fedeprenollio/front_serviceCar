import {
  DELETE_AUTO,
  DELETE_SERVICE,
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

export default function appReducer(state, action) {
  switch (action.type) {
    case SINGUP:
      return {
        ...state,
      };

    case LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case VERIFY_TOKEN:
      return {
        ...state,
        userId: action.payload,
      };

    case POST_AUTO:
      return {
        ...state,
      };
    case PUT_AUTO:
      return {
        ...state,
      };
    case GET_AUTOS:
      return {
        ...state,
        autos: action.payload,
      };
    case DELETE_AUTO:
      return {
        ...state,
      };

    case GET_SERVICE_GRAL:
      return {
        ...state,
        servicesGral: action.payload,
      };
    case GET_SERVICES_ONE_USER:
      return {
        ...state,
        servicesUser: action.payload,
      };
    case PUT_SERVICE_CAR:
      return {
        ...state,
       
      };
    case DELETE_SERVICE:
      return {
        ...state,
      };

    case GET_DETAIL_CAR:
      return {
        ...state,
        autoDetail: action.payload,
      };
    case POST_NEW_SERVICE_CAR:
      return {
        ...state,
        // serviceCar: action.payload
      };
    case PUT_ASOCIAR_SERVICE_TO_CAR:
      return {
        ...state,
      };

    default:
      return state;
  }
}
