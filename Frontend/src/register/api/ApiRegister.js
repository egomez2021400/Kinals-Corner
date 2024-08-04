import axios from "axios"; {/*se agrego api para poder crear usuario */ }
import Swal from 'sweetalert2';
import {URL_GLOBAL} from '../../constant';
const URL = URL_GLOBAL 
//const URL = "https://kinals-corner-humbertolopez2020327.vercel.app/api/"

export const createUser = async (name, email, password) => {
    try {
        const usersave = await axios.post(`${URL}create-user`, {
            name: name,
            email: email,
            password: password,
        });
        
        Swal.fire({
            icon: "success",
            title: "¡Usuario creado correctamente!",
            showConfirmButton: true,
            confirmButtonText: "OK"
        }).then(() => {
            window.location.href = "/login";
        });
        
    } catch (error) {
        console.error(error);
        console.error(error.response.data.message);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text:  error.response.data.message || "No se pudo guardar el usuario.",
            showConfirmButton: true,
            confirmButtonText: "OK"
        });
    }
  };

//   Alerta para errores
export const checkParametersRegister = (errors) => {
    try {

        let values = null;
        values = Object.values(errors)
        
        Swal.fire({
            icon: "error",
            title: "Campos invalidos.",
            text: values.length ? `${Object.values(errors)}, `: 'Por favor llena los campos para crear tu usuario.',
            showConfirmButton: true,
            confirmButtonText: "OK"
        });
    } catch (error) {
        console.log(error)
    }
}