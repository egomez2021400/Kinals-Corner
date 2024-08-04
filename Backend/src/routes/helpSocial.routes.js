'use strict'

const {Router} = require("express");
const { createHelpSocials, updateHelpSocial, patchHelpSocial, readHelpSocials, deleteHelpSocial, addImageHelpSocial} = require("../controller/helpSocial.controller");
const { getSocialHelpsByUser } = require("../controller/user.controller");
const api = Router();

api.post('/create-helpSocial', createHelpSocials);
api.patch('/update-helpSocial', patchHelpSocial);
api.get('/read-helpSocial', readHelpSocials);
api.delete('/delete-helpSocial', deleteHelpSocial);
api.put('/addImageHelpSocial', addImageHelpSocial)
api.get('/listUserHelp', getSocialHelpsByUser)
module.exports = api;