const express = require('express');
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');



// const JWT_SECRET = 'ANKUSHGUPTA0510'
const JWT_SECRET = 'ankushisagooddb$oy'




//ROUTE 2 : Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Enter a valid password').isLength({ min: 5 }),
], async (req, res) => {
  console.log(req.body);

  // If there are return  Bad request and the errors 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {


    // copy from template
    // it check user exists or not if user email have then return user email.
    let user = await User.findOne({ email: req.body.email });
    console.log(user)
    if (user) {
      return res.status(400).json({ error: 'Sorry a user with this email already exists' })
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    // Create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })

    //   .then(user => res.json(user))
    //   .catch(err => {console.log(err)
    //   res.json({error: 'Please enter a unique email ', message: err.message})})


    /* 
    // written by codewithHarry

    const user = User(req.body);
    user.save();
    */

    const data = {
      id: user.id
    }
    const authtoken = jwt.sign(data, JWT_SECRET);  // it will be provid one auth token for the user verification
    console.log(authtoken)

    res.json({ authtoken: authtoken })

    // res.send(req.body)
    // res.json(user)



  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }

})






// ROUTE 2 : Create a User using: POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'password  can not be blank').exists(),  // exists() means password will not be blank 
], async (req, res) => {

  // If there are return  Bad request and the errors 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email })  // it will be checked if exists in User then assign true otherwise false
    console.log(user, '\n\n\n')
    if (!user) {
      return res.status(404).json({ errors: 'Please try to login with correct ccredentials' });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(404).json({ errors: 'Please try to login with correct ccredentials' });
    }


    const data = {
      id: user.id
    }
    const authtoken = jwt.sign(data, JWT_SECRET);  // it will be provid one auth token for the user verification
    console.log(authtoken)
    res.json({ authtoken: authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }

})








// ROUTE 3 : Get loggined in Details using : POST "/api/auth/getuser". Login required
router.post('/getuser',fetchuser ,async (req, res) => {


  try {
    const userId = req.user.id;
    // console.log(userId);
    const user = await User.findById(userId).select('-password'); // I can find all data except password
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }

})

module.exports = router