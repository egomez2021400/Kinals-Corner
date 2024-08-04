'use strict'

const {Router} = require('express');
const api = Router();

const {validateJWT} = require('../middlewares/validate-jwt');
const {validateParams} = require('../middlewares/validate-params');
const {check} = require('express-validator');

//Importar connect-multiparty, luego hacer una instancia y enviarle el directorio donde se guardaran los archivos
const connetMultiparty = require('connect-multiparty')

const {createTeacher, addImageTeacher, getImageTeacher, readTeachers, updateTeacher, deleteTeacher} = require('../controller/teacher.controller');

//**************************** Endpoints ***********************************
// Crear profesor
api.post('/addTeacher',[
    
    check('name', 'El parametro name es necesario para actualizar el profesor.').not().isEmpty(),
    check('email', 'El parametro email es necesario para actualizar el profesor.').not().isEmpty(),
    check('subject', 'El parametro subject es necesario para actualizar el profesor.').not().isEmpty(),
    validateParams

], createTeacher)

// Ver todos los profesores
api.get('/getAllTeachers', readTeachers)

//Editar un profesor 
api.put('/updateTeacher' , [
    
    check('teacherId', 'El parametro teacherId es necesario para actualizar el profesor.').not().isEmpty(),
    check('name', 'El parametro name es necesario para actualizar el profesor.').not().isEmpty(),
    check('email', 'El parametro mail es necesario para actualizar el profesor.').not().isEmpty(),
    check('subject', 'El parametro subject es necesario para actualizar el profesor.').not().isEmpty(),
    validateParams

],updateTeacher)

//Eliminar profesor junto a su imagen
api.delete('/deleteTeacher',[

    check('teacherId', 'El parametro teacherId es necesario para actualizar el profesor.').not().isEmpty(),
    validateParams

], deleteTeacher)

// ======================== Manejo de imagenes

//Actualizar y guardar imagen de un profesor CREADO
api.put('/addImageTeacher', [
    check('teacherId', 'El parametro "teacherId" es obligatorio para la creacion de un profesor.').not().isEmpty(),
    check('photo', 'El parametro "photo" es obligatorio para la creacion de un profesor.').not().isEmpty(),
    validateParams
], addImageTeacher)

module.exports = api