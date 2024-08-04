import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import '../../assets/styles/Publicacion.css'
import { readForum, updateForumLikes } from "../api/ApiForo";

export const Publicacion = (tasks) => {
    const [publicacion, setPublicacion] = useState([]);

    const handleLikeClick = async (index) => {
        try {
            const post = publicacion[index];
            const newLikes = post.isLiked ? post.likes - 1 : post.likes + 1;
      // Llamamos a la API para actualizar los "likes" en el backend
            await updateForumLikes(post._id, newLikes);
      // Actualizamos localmente el estado de "likes" y "isLiked" en la publicación
            setPublicacion((prevPublicacion) => {
            const updatedPublicacion = prevPublicacion.map((p, i) => {
                if (i === index) {
                    return {
                    ...p,
                    likes: newLikes,
                    isLiked: !post.isLiked,
                    };
                }
        return p;
        });
        return updatedPublicacion;
    });
    } catch (error) {
        console.error('Error al actualizar el like:', error.message);
    }
};

    useEffect(() => {
        const fetchData = async () => {
            const result = await readForum();
            // Añadimos la propiedad "isLiked" a cada publicación
            const updatedResult = result.map((post) => ({ ...post, isLiked: false }));
            setPublicacion(updatedResult);
    };
    fetchData();
    }, [tasks]);

    


    return (
        <>
        <div >
            {publicacion?.map((publicacionActual, index) => (
                <div className="foro" key={publicacionActual._id} >
                    <h5 className="publicacion_title">
                        {publicacionActual.title}
                    </h5>
                    <p className="publicacion_content">
                        {publicacionActual.content}
                    </p>
                    <div className="fondito">
                        <button
                            className={`like-button ${publicacionActual.isLiked ? "liked" : ""}`}
                            onClick={() => handleLikeClick(index) }
                        >
                        <FontAwesomeIcon icon={faFire} />
                        </button>
                        <span className="likes-count">{publicacionActual.likes}</span>
                    </div>
                </div>
            ))}
            </div>
        </>
    );
};
