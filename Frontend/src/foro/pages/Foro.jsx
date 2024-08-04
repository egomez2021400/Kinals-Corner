import { useState} from 'react';
import { Publicacion } from './Publicacion';
import '../../assets/styles/Foro.css';
import { createForum } from '../api/ApiForo';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';


export const Foro = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const publicar = async (e) => {
    e.preventDefault();
    if (title.trim() === "" || content.trim() === "") { {/* verifica si algun input esta vacio, para no permitir hacer la publicacion */}
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, completa ambos campos antes de publicar',
      });
      return;
    }
    try {
      const result = await createForum(title, content);
      setTasks((prevTasks) => [...prevTasks, result]); // Agregar la nueva publicación al estado
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error al publicar:', error);
    }
  };

  return (
    <>

      <hr />
        <div className="form">
          <div className="input-group col-auto">
            <input
              type="text"
              name="title"
              placeholder="Título"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              name="description"
              placeholder="Descripción"
              className="form-control description"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button onClick={publicar}>Publicar</button>
          </div>
        </div>
        <hr />
        <hr />

        <div className="mb-3">
          <Publicacion tasks={tasks} /> {/* Pasar el estado tasks a Publicacion */}
        </div>
    </>
  );
};
