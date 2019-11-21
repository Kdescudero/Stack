import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from 'react-router-dom'

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    const url = "http://localhost:3000/api/notes";
    const res = await axios.get(url);
    const ok = res.data.ok;
    if (ok) {
      setNotes(res.data.notes);
    }
  };

  const deleteNotes = async id => {
    const url = `http://localhost:3000/api/notes/${id}`;
    const res = await axios.delete(url);
    const ok = res.data.ok;
    if (ok) {
      getNotes();
      console.log(res);
    }
  };

  useEffect(() => {
    getNotes();
  }, [setNotes]);

  return (
    <div className="row">
      {notes.map(note => (
        <div key={note._id} className="col-md-4 p-2">
          <div className="card">
            <div className="card-header d-flex justify-content-between">
              <h5>{note.title}</h5>
              <Link className="btn btn-secondary" to={`/edit/${note._id}`}>Edit</Link>
            </div>
            <div className="card-body">
              <p>{note.content}</p>
              <p>{note.author}</p>
              <p>{format(note.date, "es_ES")}</p>
            </div>
            <div className="card-footer">
              <button
                onClick={() => deleteNotes(note._id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
