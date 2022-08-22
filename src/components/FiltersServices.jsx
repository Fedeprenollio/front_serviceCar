import React from 'react'
import { Form } from "react-bootstrap"


export const FiltersServices = () => {
    return (
        <div>
            <Form.Label>Filtra por estado</Form.Label>
            <Form.Select>
                <option value="false">Pendientes de renovacion</option>
                <option value="true">Renovados</option>
            </Form.Select>
        </div>
    )
}
