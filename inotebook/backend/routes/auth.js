const express = require('express');
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');


// Create a User using: POST "/api/auth/". Doesn't require Auth
router.post('/',[
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Enter a valid password').isLength({ min: 5 }),
],(req, res)=>{
    console.log(req.body);


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // copy from template
    User.create({
        username: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }).then(user => res.json(user))
      .catch(err => {console.log(err)
      res.json({error: 'Please enter a unique email ', message: err.message})})


    /* 
    // written by codewithHarry

    const user = User(req.body);
    user.save();
    */

    // res.send(req.body)


})


module.exports = router