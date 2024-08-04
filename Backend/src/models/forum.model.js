'use strict'

const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const forumSchema = new Schema({
    title: { 
      type: String, 
      required: true 
    },
    content: { 
      type: String, 
      required: true 
    },
    likes: { 
      type: Number, 
      default: 0 
    },
    likedBy: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    }],
    comments: [
      {
        user: { 
          type: Schema.Types.ObjectId, 
          ref: 'User' 
        },
        comment: { 
          type: String, 
          required: true 
        },
        likes: {
          type: Number, 
          default: 0 
        },
      },
    ],
  });
  

module.exports = mongoose.model('Forum', forumSchema);