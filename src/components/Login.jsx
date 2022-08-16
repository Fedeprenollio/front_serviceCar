import React, { useContext, useState } from 'react'
import { GlobalContext } from './context/Contex';

export const Login = () => {
	const {postLogin } = useContext(GlobalContext);


const [datos, setDatos] = useState({
  username:"",
  password:""
})

 const  handleChange=(e)=>{
  setDatos({
    ...datos,
    [e.target.name]: e.target.value
  })
}

const handleSubmit= async(e)=>{
  e.preventDefault()
 const res= await postLogin(datos)
 if(res !== undefined){
  console.log(res)
  window.localStorage.setItem("token", JSON.stringify(res.token)); 
  const ls = JSON.parse(localStorage.getItem("token"))
 }
}

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <input onChange={handleChange} name="username" type="text" placeholder='tu usuario' />
        <input onChange={handleChange} name="password" type="text" placeholder='Tu contraseña'/>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}
