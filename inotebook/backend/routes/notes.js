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














// ROUTE 3 : Update an exiting Note using : PUT "/api/auth/updatenote" . Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {


        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        console.log(req.params.id)
        let note = await Note.findById(req.params.id)  // 'req.params.id'  give id of this '/addnote/:id' and check in Note if present than true otherwise no 
        if (!note) { return res.send(404).send("Not Found"); }

        if (note.user.toString() !== req.user.id) {
            return res.send(401).send("Not Allowed");
        }

        // NOTE :their are many keyword like this 'findByIdAndUpdate' 
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })  // set new dat in DB 
        res.json({ "Success": "Note has been deleted", note: note })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }

})








// ROUTE 4 : Delete an exiting Note using : delete "/api/auth/notes/deletenote" . Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {


        console.log(req.params.id)
        let note = await Note.findById(req.params.id)  // 'req.params.id'  give id of this '/addnote/:id' and check in Note if present than true otherwise no 
        if (!note) { return res.send(404).send("Not Found"); }

        if (note.user.toString() !== req.user.id) {
            return res.send(401).send("Not Allowed");
        }

        // NOTE :their are many keyword like this 'findByIdAndDelete' 
        note = await Note.findByIdAndDelete(req.params.id)  // Delete data in DB 
        res.json({ note })

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }

})



module.exports = router