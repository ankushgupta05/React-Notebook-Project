const express = require('express');
const router = express.Router()
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


// ROUTE 1 : Get All the Notes using the Notes: GET "/api/auth/fetchallnotes" . Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {

        const notes = await Note.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
})





// ROUTE 2 : Add a new Note using POST : GET "/api/auth/addnote" . Login required
router.post('/addnote', fetchuser, [

    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'DESC must be 5 charactors').isLength({ min: 5 }),

], async (req, res) => {
    const { title, description, tag } = req.body;
    // If there are return  Bad request and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save();
        // console.log(note)
        res.json(saveNote)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
})









// ROUTE 3 : Update an exiting Note using POST : GET "/api/auth/updatenote" . Login required
router.post('/addnote', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    



})






module.exports = router