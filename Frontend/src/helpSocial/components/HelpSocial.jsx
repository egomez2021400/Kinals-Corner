import { useEffect, useState } from "react";
import { URL_GLOBAL } from "../../constant";
import { getFile } from "../../firebase/config";

const URL = URL_GLOBAL

export const HelpSocial = ({
    _idHelpSocial,
    title,
    description,
    setHelpSocial,
    helpSocials,
    adminsitrador
}) => {
    const [modalShow, setModalSho] = useState(false);
    
    const [image, setImage] = useState();

    useEffect (() => {
        const getURLImage = async() => {
            await getFile(_idHelpSocial).then(
                (response) => {
                    setImage(response + "")
                }
            )
        }
        getURLImage()
    }, [])
    
    return(
        <>
        <div style={styles.containerTeacher} className="card-teacher" >
        <div className="d-flex flex-column justify-content-center">
          <img src={image} style={styles.image}></img>
          <div className="d-flex flex-column align-items-center justify-content-center mt-4" >
            <p style={{marginBottom: '-10px', color: 'rgb(66, 66, 66)'}}>Titulo:</p>
            <h6 className="mt-3" style={styles.nameTeacher}>
              {title}
            </h6>
          </div>
        </div>
        <div className="ms-4">
            <h5>Informacion</h5>
            <hr/>
            <h6 style={styles.subTitles}>Descripcion:</h6>
            <h6>{"" + description}</h6>

            {adminsitrador && (
                <div style={styles.buttonsFooter}>
                    <button>
                        Eliminar
                    </button>
                    <button>
                        Editar
                    </button>
                </div>
            )}
        </div>
        </div>
        </>
    )

}; 

const styles = {
    containerTeacher: {
      display: "flex",
      border: "1px solid #D5D5D5",
      borderRadius: "10px",
      maxWidth: "450px",
      width: "450px",
      margin: "20px",
      padding: "30px",
    },
    image: {
      height: "100px",
      width: "100px",
      objectFit: "cover",
      borderRadius: "50%",
    },
    nameTeacher: {
      maxWidth: "150px",
    },
    subTitles: {
      color: "rgb(66, 66, 66)",
    },
    buttonsFooter: {
      marginTop: "20px",
    },
  };

