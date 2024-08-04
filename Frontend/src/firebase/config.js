import { initializeApp } from "firebase/app";
//import {getStorage} from 'firebase/storage'
import {deleteObject, getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyB1haXGxGWwtM4JPOwpfMkRNg__lQv6sr8",
    authDomain: "kinals-remasterized.firebaseapp.com",
    projectId: "kinals-remasterized",
    storageBucket: "kinals-remasterized.appspot.com",
    messagingSenderId: "283164109797",
    appId: "1:283164109797:web:9d101385c78987ab041d0c",
    measurementId: "G-LX3VJQE99T"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)

export async function uploadFile(file, id) {
    const storageRef = ref(storage, 'teachers/' +id)
    await uploadBytes(storageRef, file)
}

export async function getFile(id) {
    const url = await getDownloadURL(ref(storage, `teachers/${id}`))
    return url
}

export async function deleteFile(id){
    const desertRef = ref(storage, `teachers/${id}`)
    return await deleteObject(desertRef)
}