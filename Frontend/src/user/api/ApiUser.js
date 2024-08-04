import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import {URL_GLOBAL} from '../../constant';
 const URL = URL_GLOBAL; 
//const URL = "https://kinals-corner-humbertolopez2020327.vercel.app/api/"


/* Buscar usuarios */
export const SearchUser = async () =>{
    try{
        const response = await axios.get(`${URL}search-user`);
        return response.data.User;
    }catch(error){
        console.log(error)
    }
}

/* Editar usuario */
export const updateUser = async(name, email, password, rol) =>{
    try{
        const data ={
            name: name,
            email: email,
            password: password,
            rol: rol,
        }

        const response = await axios.put(`${URL}update-user`, data)

        return response && Swal.fire({
            icon: "success",
            title: "Se edito el usuario correctamente",
            showConfirmButton: true,
        })
    }catch(error){
        console.log(error)
        Swal.fire({
            icon: "error",
            title: "Vaya...",
            text: "Hubo un error al editar el usuario",
            showConfirmButton: true,
            confirmButtonText: "OK"
        })
    }
}

export const deleteUser = async(userId) =>{
    try{
        const response = await axios.delete(`${URL}delete-user`, {
            data: {
                userId: userId,
            },
        });

        return response;
    }catch(error){
        console.log(error)
    }
}

export const confirmDeleteUser = (userId, users, userEdit) =>{
    Swal.fire({
        icon: "question",
        text: "¿Quiere eliminar el usuario?",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        cancelButtonColor: "red",
        confirmButtonText: "Eliminar",
        confirmButtonColor: "#49a43a"
    }).then((r) => {
        if(r.isConfirmed) {
            deleteUser(userId).then(() => {
                userEdit(users.filte((user) => user._id !== userId));
            });
        }
    });
};

export const useToken =() =>{
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token;
    };

    const [token, setToken] = useState(getToken());

    return [token, setToken]
}
