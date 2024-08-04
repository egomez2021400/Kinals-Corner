'use strict'

import axios from 'axios';
import Swal from 'sweetalert2';
import {URL_GLOBAL} from '../../constant';
// import {deleteFile, uploadFile} from '../../firebase/config'
import { uploadFileHS } from '../../firebase/config';

const URL = URL_GLOBAL

//=============================listado de las ayudas sociales====================================================

export const getHelpSocials = async () =>{
    try{
        const response = await axios.get(`${URL}read-helpSocial`);
        return response.data.helpSocials;
    }catch(error){
        console.log(error)
    }
}

//======================================Manejo de imagenes==============================================================

export const addImageHelpSocial = async(helpSocialId, image, edit) => {
    try{
        await uploadFileHS(image, helpSocialId);

        const data = {
            helpSocialId: helpSocialId,
            image: helpSocialId,
        };

        const response = await axios.put(`${URL}addImageHelpSocial`, data);

        if(response){
            Swal.fire({
                icon: "success",
                title: `${
                edit ? "Se edito correctamente a la" : "Se agrego a la"
                } ayuda social correctamente.`,
                showConfirmButton: true,
                confirmButtonColor: "#32FF00",
            });
        }
    }catch(error){
        console.error(error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.msg,
            showConfirmButton: true,
            confirmButtonText: "OK",
        });
    }
}

// ==================================createHelpSocial==============================================================

//1 cambio y uno para a tras

export const createHelpSocial = async (title, description, image) => {
    try {
        let fileExtension = image.type + "";
        fileExtension = fileExtension.split("/").pop();

        if (
            fileExtension === "png" ||
            fileExtension === "jpg" ||
            fileExtension === "jpeg" ||
            fileExtension === "gif"
        ) {
            const data = {
                title: title,
                description: description,
            };

            const response = await axios.post(`${URL}create-helpSocial`, data);
            const newHelpSocial = response.data.newHelpSocial;

            // Wait for the image to be uploaded before proceeding
            await addImageHelpSocial(newHelpSocial._id, image);
        } else {
            Swal.fire({
                icon: "info",
                title: "El tipo del archivo no es admitido",
                showConfirmButton: true,
                confirmButtonColor: "tomato",
            });
            return;
        }
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response,
            showConfirmButton: true,
            confirmButtonText: "OK",
        });
    }
}











