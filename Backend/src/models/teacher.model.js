'use strict'

const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    name: { 
        type: String,
        required: true 
    },
    photo: { 
        type: String 
    },
    subject: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }
  });
  
module.exports = mongoose.model('Teacher', teacherSchema);