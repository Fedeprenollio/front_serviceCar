import React from 'react'
import { Form } from "react-bootstrap"


export const FiltersServices = ({setStatusServ}) => {




    return (
        <div>
            <Form.Label>Filtra por estado</Form.Label>
            <Form.Select onClick={(e)=> setStatusServ(e.target.value)}>
                <option value="false">Todos</option>
                <option value="false">Pendientes de renovacion</option>
                <option value="true">Renovados</option>
            </Form.Select>
        </div>
    )
}
