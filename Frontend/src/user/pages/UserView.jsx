import { useEffect, useState } from 'react'
import axios from 'axios';
import '../styles/UserStyle.css'

import {URL_GLOBAL} from '../../constant';
const URL = URL_GLOBAL

export const UserView = () => {
  const [login, setLogin] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    const UserSearch = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${URL}search-user`, {
          headers: {
            Authorization: `Token ${token}`
          }
        });
        const data = response.data.login;
        setLogin(data);
      } catch (error) {
        console.error("Error al buscar el usuario", error);
      }
    }

    UserSearch()
  }, [])


  return (
    <>
      <div className="container2">
        <div className="profile-card">
          <div className="upper-container">
            <h2>Perfil de Usuario</h2>
            {login.length === 0 ? (
              <p>No se ha iniciado sesión</p>
            ) : (
              <ul className="lower-container">
                <li key={login.token} className=''>Nombre: {login.name} </li>
                <li key={login.token}>Email: {login.email} </li>
                <li key={login.token}>Password: {login.password} </li>
              </ul>
            )}
            <button className='buttonUser'>Editar</button>
            <button className='buttonUser'>Eliminar</button>
          </div>
        </div>
        <div className="profile-card">
          <div className="upper-container">
            <h2 className="title">Editar Usuario</h2>
            <div className='label-input-container'>
              <label className=''>Nombre</label>
              <input type="text" value={name} onChange={({ target: { value } }) => setName(value)} />
            </div>
            <div className='label-input-container'>
              <label className=''>Email</label>
              <input type="email" value={email} onChange={({ target: { value } }) => setEmail(value)} />
            </div>
            <div className='label-input-container'>
              <label className=''>Password</label>
              <input type="password" value={password} onChange={({ target: { value } }) => setPassword(value)} />
            </div>
            <button className='buttonUser'>Eliminar</button>
          </div>
        </div>
      </div>
    </>
  )
}
