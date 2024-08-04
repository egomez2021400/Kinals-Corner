import React, { useEffect, useState } from "react";
import { confirmDeleteTeacher } from "../api/teachers";
import { UpdateTeacher } from "./UpdateTeacher";
import '../../assets/styles/cardTeacher.css'
import { URL_GLOBAL } from "../../constant";
import { getFile } from "../../firebase/config";
import { Link } from "react-router-dom";

const URL = URL_GLOBAL

export const Teacher = ({
  _idTeacher,
  name,
  subject,
  email,
  setTeachers,
  teachers,
  administrador,
}) => {
  // Modal
  const [modalShow, setModalShow] = useState(false);

  //URL para peticon de la imagen
  const [image, setImage] = useState();

  useEffect(() => {
    const getURLImage = async() => {
      await getFile(_idTeacher).then(
        (response) => {
          setImage(response + "")
        }
      )
    }
    getURLImage()
  }, [])
  

  return (
    <>
      <div style={styles.containerTeacher} className="card-teacher" >
        <div className="d-flex flex-column justify-content-center">
          <img src={image} alt="Imagen" style={styles.image}></img>
          <div className="d-flex flex-column align-items-center justify-content-center mt-4" >
            <p style={{marginBottom: '-10px', color: '#9BA399'}}>Nombre:</p>
            <h6 className="mt-3" style={styles.nameTeacher}>
              {name}
            </h6>
          </div>
        </div>

        <div className="ms-4">
          <h5>Información</h5>
          <hr />
          <h6 style={styles.subTitles}>Materia:</h6>
          <h6>{"" + subject}</h6>
          <h6 style={styles.subTitles}>Contacto:</h6>
          <Link className = 'link-outlook' to={`https://outlook.live.com/mail/deeplink/compose?to=${email}`}>
          <h6 >{"" + email}</h6>
          </Link>

          {administrador && (
            <div style={styles.buttonsFooter}>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  confirmDeleteTeacher(_idTeacher, setTeachers, teachers);
                }}
              >
                Eliminar
              </button>

              <button
                className="btn btn-secondary ms-4"
                onClick={() => setModalShow(true)}
              >
                Editar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalShow && (
        <UpdateTeacher
          show={modalShow}
          onHide={() => setModalShow(false)}
          _idTeacher={_idTeacher}
          name={name}
          subject={subject}
          email={email}
          setTeachers={setTeachers}
          urlImageTeacher={setImage}
          oldImage ={image}
        />
      )}
    </>
  );
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
    color: "#9BA399",
  },
  buttonsFooter: {
    marginTop: "20px",
  },
};
