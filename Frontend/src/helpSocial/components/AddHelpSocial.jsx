import  { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import { createHelpSocial, getHelpSocials } from '../api/helpSocials';

export const AddHelpSocial = (props) => {
    const [titleHelpSocial, setTitleHelpSocial] = useState('');
    const [descriptionHelpSocial, setDescriptionHelpSocial] = useState('');
    const [imageHelpSocial , setImageHelpSocial] = useState(null);

    const checkParameters = () => {
        if(titleHelpSocial.trim().length == 0 || descriptionHelpSocial.trim().length ==0){
            Swal.fire({
                icon: 'error',
                title: 'Campos vacíos',
                text: 'Debe llenar todos los campos para agregar la nueva ayuda social.',
                showConfirmButton: true,
                confirmButtonText: 'Ok',
                confirmButtonColor: 'tomato'
            })
            return false
        }else if(!imageHelpSocial){
            Swal.fire({
                icon: 'error',
                title: 'Sin imagen',
                text: 'Debe llenar todos los campos para agregar la nueva ayuda social.',
                showConfirmButton: true,
                confirmButtonText: 'Ok',
                confirmButtonColor: 'yellow'
            })
            return false
        } 
        return true
    }

    const cancelAddhelpSocial = () => {
        setImageHelpSocial(null)
        setTitleHelpSocial('')
        setDescriptionHelpSocial('')
        props.onHide()
    }

    const clearStates = () => {
        setImageHelpSocial('')
        setTitleHelpSocial('')
        setDescriptionHelpSocial('')
    }

    const fetchCreateHelpSocial = async() => {
        try{
            if(!checkParameters()) return
            const image = new FormData()
            image.append('image', image)
            console.log('Desde el agregar, la imagen es:');
            console.log(image);

            console.log(`titleHelpSocial -> ${titleHelpSocial}`);
            console.log(`descriptionHelpSocial -> ${descriptionHelpSocial}`);
                

            await createHelpSocial(titleHelpSocial, descriptionHelpSocial, imageHelpSocial).then(
                () => {
                    setTimeout(
                        () => {
                            getHelpSocials().then((helpSocials) => props.set_helpSocials(helpSocials));
                        },
                        1000
                    )
                }
            )
            clearStates();
            props.onHide()
        }catch(err){
            console.log(err)
        }
    }

    return(
        <Modal 
        {...props}
        size='lg'
        arial-labellledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Agregar Ayuda Social
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex flex-column align-items-center justify-content-center'>
                <h6>Datos para la nueva ayuda social</h6>
                <div className="mb-3 col-8">
                <label className='form-label'>Titulo:</label>
                <input type="text" className='form-control' onChange={(e) => setTitleHelpSocial(e.target.value)} />
                <label className='form-label'>Descripcion</label>
                <input type="text" className='form-control' onChange={(e) => setDescriptionHelpSocial(e.target.value)} />
                {/* Agregar imagen */}
                <label className='form-label mt-2'>Objeto perdido(photo)</label>
                <div className='input-group mb-3'>
                    <input type="file" className='form-control' onChange={(e) => setImageHelpSocial(e.target.files[0])}/>
                </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
        <Button className='btn btn-success' onClick={
            () => {
                fetchCreateHelpSocial()
                }
            }>Agregar</Button>

        <Button className='btn btn-danger' onClick={
            () => {
            cancelAddhelpSocial()
                }
            }>Cancelar</Button>
    </Modal.Footer>
        </Modal>
    )

}
















