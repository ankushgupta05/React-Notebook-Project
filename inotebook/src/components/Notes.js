import React, { useEffect } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';


const Notes = () => {


    const context = useContext(noteContext);
    //   const {notes, setNotes} = context;
    const { notes,getNotes } = context;

    useEffect(() => {
        getNotes();
        // eslint-disable-next-lin
    }, [])
    

    return (
        <>
            <AddNote />
            <div className="row my-3">
                <h1>Your Note</h1>
                {notes.map((note) => {
                    return <Noteitem key={note._id} note={note} />;  // we have pass prompt here
                })}
            </div>
        </>
    )
}

export default Notes
