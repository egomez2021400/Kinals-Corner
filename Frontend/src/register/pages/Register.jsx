import "../../assets/styles/register.css";
import logo from "../../assets/image/LogoHd.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { checkParametersRegister, createUser } from "../api/ApiRegister";

export const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const imprimir = async (e) => {
    e.preventDefault();

    setErrors({});

    const newErrors = {};

    if (name === "") {
      {
        /* si el campo se encuentra vacio dara error antes de mandar el post */
      }
      newErrors.name = "Por favor, ingresa tu nombre";
    }

    if (email === "") {
      newErrors.email = "Por favor, ingresa tu correo";
    } else if (
      !email.endsWith("@kinal.edu.gt") &&
      !email.endsWith("@kinal.org.gt")&&
      !email.endsWith("@miumg.edu.gt")&&
      !email.endsWith("@miumg.org.gt")
    ) {
      [
        /*en caso de que el correo no sea de kinal mostrara error antes de enviar el post */
      ];
      newErrors.email = "El correo debe ser institucional";
    }

    if (password === "") {
      newErrors.password = "Por favor, ingresa tu contraseña";
    } else if (password.length < 8) {
      {
        /* en caso de que la contraseña sea menor a 8 caracteres mostrara error antes de mandar el post */
      }
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      checkParametersRegister(errors)
      return;
    }

    const result = await createUser(name, email, password);
    {
      /*se manda a llamar al api */
    }
    if (result) {
      {
        /* alerta por si la creacion se dio correctamente */
      }
      Swal.fire({
        icon: "success",
        title: "Genial",
        text: "Se ha creado el usuario correctamente",
        confirmButtonText: "Ok",
      }).then((r) => {
        if (r.isConfirmed) {
          navigate('/');
        } else {
          navigate('/');
        }
      });
    }
  };

  return (
    <>
      <div className="container-register">
          <div className="card-register">
            <div className="card-register-title">
              <center>
                <h2>Registro de Usuarios</h2>
              </center>
              <center>
                <img src={logo} alt="logo" />
              </center>
            </div>
            <p>Ingrese los datos para crear una cuenta</p>
            <div className="content-register">
              <label>Nombres</label>
              <input
                type="name"
                id="name"
                className="form-control"
                value={name}
                onChange={({ target: { value } }) => setName(value)}
                placeholder="Ingrese su nombre"
                required
              />
            </div>
            <div className="content-register">
              <label>Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={({ target: { value } }) => setEmail(value)}
                placeholder="Ingrese su correo"
                required
              />
            </div>
            <div className="content-register">
              <label>Contraseña</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
                placeholder="Ingrese su contraseña"
                required
              />
            </div>
              <button
              type="submit" 
              onClick={(e) => imprimir(e)} 
              className="btn btn-success btn-submit-register"
              >
                Crear Cuenta
              </button>
          </div>
      </div>
    </>
  );
};
