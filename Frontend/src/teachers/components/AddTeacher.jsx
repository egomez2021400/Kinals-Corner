import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Swal from 'sweetalert2'
import { createTeacher, getTeachers } from '../api/teachers';

export const AddTeacher = (props) => {

  const [nameTeacher, setNameTeacher] = useState('');
  const [subject, setSubject] = useState('')
  const [email, setEmail] = useState('')

  //Estado para la imagen
  const [imageTeacher, setImageTeacher] = useState(null)

  // Funcion para comprobar los campos de envio
  const checkParameters = () =>{
    if ( nameTeacher.trim().length == 0 || subject.trim().length == 0 || email.trim().length == 0 ){
      Swal.fire({
        icon: 'error',
        title: 'Campos vacíos',
        text: 'Debe llenar todos los campos para agregar al nuevo profesor.',
        showConfirmButton: true,
        confirmButtonText: 'Ok',
        confirmButtonColor: 'tomato'
      })
      return false
    }else if( !imageTeacher ){
      Swal.fire({
        icon: 'error',
        title: 'Sin imagen',
        text: 'Debe llenar todos los campos para agregar al nuevo profesor.',
        showConfirmButton: true,
        confirmButtonText: 'Ok',
        confirmButtonColor: 'yellow'
      })
      return false
    }
    return true
  }

  //Cancelar el agregar
  const cancelAddTeacher =  () =>{
    setImageTeacher(null)
    setNameTeacher('')
    setEmail('')
    setSubject('')
    props.onHide()
  }

  //Agregar
  const fetchCreateTeacher = async() => {
    try {
      
      //Comprobar que se hayan llenado todos los parametros
      if( !checkParameters() ) return 

      //Guardar la imagen en un formulario
      const image = new FormData()
      image.append('image', image)
      console.log('Desde el agregar, la imagen es:');
      console.log(image);

      await createTeacher(nameTeacher, subject, email, imageTeacher).then(
        () => {

          setTimeout(
            ()=> {
              getTeachers().then((teachers) => props.set_teachers(teachers));
            },
            1000
          )
        }
      )

      clearStates()
      props.onHide()


    } catch (error) {
      console.error(error);
    }
  }

  //Limpiar los datos de los estados
  const clearStates = () => {
    setEmail('')
    setImageTeacher('')
    setNameTeacher('')
    setSubject('')
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Agregar Profesor
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex flex-column align-items-center justify-content-center'>
        <h6>Datos para el nuevo profesor:</h6>
        <div className="mb-3 col-8">
            
        <label className="form-label">Nombre:</label>
        <input type="text" className="form-control" onChange={ (e) => setNameTeacher( e.target.value ) } />
        
        <label className="form-label">Materia / Clase: </label>
        <input type="text" className="form-control" onChange={ (e) => setSubject( e.target.value ) } />
        
        <label className="form-label">Correo - Contacto: </label>
        <input type="text" className="form-control" onChange={ (e) => setEmail( e.target.value ) } />

        {/* Agregar la imagen */}
          <label className="form-label mt-2">Foto del profesor:</label>
        <div className="input-group mb-3">
          <input type="file" className="form-control"
          onChange={
            (e) => setImageTeacher( e.target.files[0] )
          }/>
        </div>

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className='btn btn-dark' onClick={
            () => {
              fetchCreateTeacher()
            }
          }>Agregar</Button>

        <Button className='btn btn-dark' onClick={
          () => {
            cancelAddTeacher()
          }
        }>Cancelar</Button>
      </Modal.Footer>
    </Modal>
  )
}
