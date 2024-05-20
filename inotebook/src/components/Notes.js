import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';


const Notes = () => {


    const context = useContext(noteContext);
    //   const {notes, setNotes} = context;
    const { notes, getNotes } = context;

    useEffect(() => {
        getNotes();
        // eslint-disable-next-lin
    }, [])


    const updateNote = (currentNote) => {
        ref.current.click()  // current means ref kaha point kar raha hai waha lick karo
        setNote({etitle : currentNote.title,edescription : currentNote.description,etag : currentNote.tag});

    }

    const ref = useRef(null)
    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "default" })



    const handleClick = (e) => {
        console.log('updating new node ' , note)
        e.preventDefault();  // bcz of this line page will not reload

    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
        // {...note } means isme jo value hai rahne do lekin  jo value extra aa rahi hai unko [...note] par over write kar do
    };


    return (
        <>
            <AddNote />

            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control"  id="etitle" value={note.etitle} name="etitle" aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" value={note.etag} name="etag" onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClick} className="btn btn-primary">Commit changes</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row my-3">
                <h1>Your Note</h1>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />;  // we have pass prompt here
                })}
            </div>
        </>
    )
}

export default Notes
