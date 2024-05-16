const mongoose = require('mongoose');

const NotesSchema = new Schema({
    title : {
        type: String,
        require: true
    },

    description: {
        type: String,
        require: true,
    },

    tag : {
        type: String,
        default: "Genral"
    },

    date : {
        type: Date,
        default : new Date().toDateString()
    },
  });
  
module.exports = mongoose.model('notes',NotesSchema)