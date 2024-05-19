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
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDg5MmVhNDRlNzliMDdlZjc3MGJiNiIsImlhdCI6MTcxNjAzMjI1Mn0.UsMlAohhNV5WOuJKUeNQHCk2zgJ0ZSp4qXR8a9RcCbk'
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
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDg5MmVhNDRlNzliMDdlZjc3MGJiNiIsImlhdCI6MTcxNjAzMjI1Mn0.UsMlAohhNV5WOuJKUeNQHCk2zgJ0ZSp4qXR8a9RcCbk'
            },
            body: JSON.stringify({title, description,tag})
        });
        // return response.json();
        // const json = response.json();

        console.log("Adding a new note")

        const note = {
            "_id": "1212126648c76d17d5168597eb1ea0",
            "user": "121212664892ea44e79b07ef770bb6",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2024-05-17T18:30:00.000Z",
            "__v": 0
        };

        setNotes(notes.concat(note))  // concat return an new error value after pushing note

    }





    // Delete a Note
    const deleteNote = (id) => {
        console.log('delete note id is ' + id);
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote);
    }



    // Edit a Note
    const editNote = async (id, title, description, tag) => {

        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDg5MmVhNDRlNzliMDdlZjc3MGJiNiIsImlhdCI6MTcxNjAzMjI1Mn0.UsMlAohhNV5WOuJKUeNQHCk2zgJ0ZSp4qXR8a9RcCbk'
            },
            body: JSON.stringify({title, description, tag})
        });
        // return response.json();
        const json = response.json();


        // Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }


        }
    }





    return (
        // <noteContext.Provider value={{notes,setNotes}}>
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </noteContext.Provider>
    )

}

export default NoteState