"use strict";

const Teacher = require("../models/teacher.model");

//Modulo nativo de node.js que permite interactuar con archivos del sistema.
const fs = require("fs");
//Modulo nativo de node.js que permite trabajar con rutas de archivos y directorios
const path = require("path");
const { stringify } = require("querystring");

//Crear profesor
const createTeacher = async (req, res) => {
  try {
    let newTeacher = new Teacher(req.body);

    const mailExists = await Teacher.findOne({ email: newTeacher.email });
    if (mailExists)
      return res
        .status(400)
        .send({
          message:
            "El correo que tratas de registrar para el nuevo profesors ya esta en uso.",
        });

    newTeacher = await newTeacher.save();

    if (!newTeacher)
      return res
        .status(500)
        .send({ message: "No se ha podido crear el nuevo profesor." });

    return res
      .status(200)
      .send({ message: "Nuevo profesor creado correctamente.", newTeacher });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "No se ha podido completar la tarea.", error });
  }
};

const readTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    if (teachers.length == 0)
      return res.status(404).send({ message: "No se han agregado profesores" });

    return res
      .status(200)
      .send({ message: "Profesores encontrados", teachers });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "No se ha podido completar la tarea.", error });
  }
};

//Actualizar un profesor
const updateTeacher = async (req, res) => {
  try {
    let newTeacher = req.body;

    const mailExists = await Teacher.findOne({ email: req.body.email });

    if (mailExists && mailExists._id != req.body.teacherId)
      return res
        .status(400)
        .send({
          message:
            "El correo que tratas de registrar para el nuevo profesor ya esta en uso.",
        });

    if (newTeacher.photo) delete newTeacher.photo;

    newTeacher = await Teacher.findOneAndUpdate(
      { _id: req.body.teacherId },
      { ...newTeacher },
      { new: true }
    );

    if (!newTeacher)
      return res
        .status(404)
        .send({ message: "No se encontro el profesor y no se actualizo" });

    return res
      .status(200)
      .send({
        message: "El profesor fue actualizado correctamente.",
        newTeacher,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "No se ha podido completar la tarea.", error });
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const teacherId = req.body.teacherId;

    let teacherDelete = await Teacher.findOneAndDelete({ _id: teacherId });

    if (!teacherDelete)
      return res
        .status(404)
        .send({ message: "No se encontro el profesor a eliminar." });

    if (teacherDelete.photo) {
      let pathFile = "./uploads/teachers/";
      fs.unlinkSync(pathFile + teacherDelete.photo);
    }

    return res
      .status(200)
      .send({
        message:
          "Profesor eliminado correctamente. Datos del profesor eliminado:",
        teacherDelete,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "No se ha podido completar la tarea.", error });
  }
};

// =============================== Manejo de imagenes ===================================

//Agregar foto a un profesor
const addImageTeacher = async (req, res) => {
  try {
    //Obtener el id del profesor al que se le va agregar la imagen
    const teacherId = req.body.teacherId;
    const photo = req.body.photo

    if (!teacherId)
      return res
        .status(400)
        .send({ message: "El parametro `teacherId` es obligatorio." });
    //Actualizar el profesor
    const teacherUpdate = await Teacher.findOneAndUpdate(
      { _id: teacherId },
      { photo: photo },
      { new: true }
    );

    if (!teacherUpdate)
      return res
        .status(404)
        .send({ message: "No se encontro el profesor y se agrego la imagen." });

    return res
      .status(200)
      .send({ message: "Imagen agregada al profesor.", teacherUpdate });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al agregar imagen.", error });
  }
};

module.exports = {
  createTeacher,
  addImageTeacher,
  readTeachers,
  updateTeacher,
  deleteTeacher,
};
