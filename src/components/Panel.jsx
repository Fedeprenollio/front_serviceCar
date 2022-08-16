import React from 'react'
import { CrearAuto } from './CrearAuto'
import { TusAutos } from './TusAutos'

export const Panel = () => {



    
  return (
    <div>
      <h2>Tus autos:</h2>
      <TusAutos/>
      <h2>Nuevo Auto</h2>
      <CrearAuto/>
    </div>
  )
}
