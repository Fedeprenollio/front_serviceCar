import { createContext } from 'react';

export const initialState = {
	servicesGral:[],
	user:[],
	autos:[],
	serviceCar:[],
	autoDetail:[]
};

export const GlobalContext = createContext(initialState);