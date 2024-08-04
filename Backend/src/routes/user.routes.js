'use strict'

const { Router } = require("express");
const { check } = require("express-validator")
const { createUser, readUser, updateUser, deleteUser, loginUser, readProfileUser } = require("../controller/user.controller");
const { validateParams } = require("../middlewares/validate-params");
const { validateJWT } = require("../middlewares/validate-jwt");
const { rolAdmin } = require("../middlewares/validate-rol");

const api = Router();

/* Ruta para creación del usuario */
api.post('/create-user', [
    check('name', 'El parametro name es necesario para la creación del usuario').not().isEmpty(),
    check('email', 'El parametro email es necesario para la creación del usuario').not().isEmpty(),
    check('email').custom(value => {
        if(!value.endsWith('@kinal.edu.gt') && !value.endsWith('@kinal.org.gt')){
            throw new Error("El parametro email debe ser de un profesor o estudiante")
        }
        return true;
    }),
    check('password', 'El parametro password debe contar con 8 o más caracteres').isLength({min: 8}),
    validateParams
], createUser);

/* Ruta para listar los usuarios */
api.get('/list-user', [
    /* rolAdmin */
], readUser);

/* Ruta para ver el usuario propio */
api.get('/search-user', [
    validateJWT,
    validateParams
], readProfileUser)

/* Ruta para editar un usuario */
api.put('/update-user/:id', [
    validateJWT,
    /* rolAdmin */
], updateUser);

/* Ruta para editar el usuario logeado */
api.put('/update-user', [
    validateJWT
], updateUser)

/* Ruta para eliminar un usuario */
api.delete('/delete-user',[
    validateJWT,
/*     rolAdmin */
], deleteUser);

/* Ruta para inciar sesión */
api.post('/login', loginUser);

module.exports = api;