import { createContext } from 'react';

export const initialState = {
	servicesGral:[],
	user:[],
	userId:null,
	autos:[],
	serviceCar:[],
	servicesStatus:[],
	autoDetail:[],
	servicesUser:[]
};

export const GlobalContext = createContext(initialState);