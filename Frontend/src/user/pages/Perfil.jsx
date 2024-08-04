import { useEffect, useState } from 'react'
import '../styles/UserStyle.css'


export const Perfil = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});


    // Decodificar el token para obtener los datos del usuario



  return (
    <>
      <div>
        {token ? (
          <div>
            <h2>Bienvenido, </h2>
            <p>Correo electrónico: {user.name}</p>
            <p>ID de usuario: {user.uId}</p>
            {/* te queda de tarea mostrar otros detalles por token :) */}
          </div>
        ) : (
          <p>No se ha iniciado sesión.</p>
        )}
      </div>
    </>
  )
}
