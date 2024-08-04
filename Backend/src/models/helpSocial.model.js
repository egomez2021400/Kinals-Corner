'use strict'

const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const helpSocialSchema = new Schema({
    title: { 
        type: String, 
        required: true
    },
    description: { 
        type: String, 
        required: true
    },
    image: { 
        type: String 
    },
    claimed: { 
        type: Boolean, 
        default: false 
    },
    claimDate: { 
        type: Date,
        default: Date.now
    },
    claimantName: { 
        type: String 
    },
});

module.exports = mongoose.model('HelpSocial', helpSocialSchema);