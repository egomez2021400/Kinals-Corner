import { useEffect, useState } from "react";
import { Teacher } from "../components/Teacher";
import { getTeachers } from "../api/teachers";
import { AddTeacher } from "../components/AddTeacher";

import "../../assets/styles/teacher.css";

export const Teachers = () => {
  //Cambiar titulo de la pagina
  document.title = "Profesores";

  const [teachers, setTeachers] = useState(null);

  const [administrador, setAdministrador] = useState(true);

  //Llmado a la funcion para ver los profesores

  useEffect(() => {
    //Cuando se tenga la respuesta se cambiara el valor del estado teachers
    getTeachers().then((teachers) => setTeachers(teachers));
  }, []);

  // Modal
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div className="container d-flex flex-column mt-4">        

        {/* ****Este componenete se debe mostrar solo si el usuario logueado es de tipo administrador ****/}
        {administrador && (
          <div className="d-flex justify-content-end" >
            <button
              className="btn btn-primary ms-1 col-2 button-addTeacher"
              onClick={() => setModalShow(true)}
            >
              Agregar profesor
            </button>
          </div>
        )}
        {/* Mensaje para cuando no hayan profesores */}
        {teachers == null || teachers.length == 0 ? (
          <h2 className="mt-4"style={{color: 'gray'}}>No se han agregado profesores....</h2>
        ):
        null}
      </div>

      {/* Modal */}
      <div>
        <AddTeacher
          show={modalShow}
          onHide={() => setModalShow(false)}
          set_teachers={setTeachers}
        />
      </div>

      <div className="row d-flex justify-content-center">
        {teachers &&
          teachers.map((teacher) => (
            <div
              key={teacher._id}
              className="col-sm-7 col-lg-5 d-flex align-self-center justify-content-center"
            >
              <Teacher
                key={teacher._id}
                _idTeacher={teacher._id}
                name={teacher.name}
                subject={teacher.subject}
                email={teacher.email}
                // Manejo del arrelgo de adminisatradores
                setTeachers={setTeachers}
                teachers={teachers}
                //Manejo del rol del usuario
                administrador={administrador}
              />
            </div>
          ))}
      </div>
    </>
  );
};
