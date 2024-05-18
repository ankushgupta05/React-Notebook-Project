const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    
    name : {
        type: String,
        require: true
    },

    email : {
        type: String,
        require: true,
        unique : true
    },

    password : {
        type: String,
        require: true
    },

    date : {
        type: Date,
        default :new Date().toDateString() 
    },
  });
 
  
  const  User = mongoose.model('user',UserSchema);
//   User.createIndexes();  // this line not allow you to create duplicate email   

 module.exports = User;