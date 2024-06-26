import React, { useState } from "react";
import noteContext from "./noteContext";
const host = "http://localhost:5000"

const NoteState = (props) => {

    const notesInitial = []



    const [notes, setNotes] = useState(notesInitial)


    // Get all  Notes
    const getNotes =async () => {
         // API Call
         const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });

        const json = await response.json();
        console.log(json);
      
        setNotes(json)
    }




    // Add a Note
    const addNote =async (title, description, tag) => {
         // API Call
         const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description,tag})
        });
        // return response.json();
        // const json = response.json();

        const note = await response.json();
        setNotes(notes.concat(note))  // concat return an new error value after pushing note
        

    }





    // Delete a Note
    const deleteNote = async(id) => {
        // API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        // return response.json();
        const json = response.json();  // not need now

        console.log(json);
        console.log('delete note id is ' + id);
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote);
    }



    // Edit a Note
    const editNote = async (id, title, description, tag) => {

        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        // return response.json();
        const json = response.json();
        console.log(json)
        





        // Logic to edit in client

        let newNotes =await JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }

        }
        setNotes(newNotes)

    }





    return (
        // <noteContext.Provider value={{notes,setNotes}}>
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </noteContext.Provider>
    )

}

export default NoteState