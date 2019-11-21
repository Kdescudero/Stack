import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateNote = props => {
  const [editing, setEditing] = useState(false);
  const [users, setUsers] = useState([]);
  const [date, setDate] = useState(new Date());
  const [form, setForm] = useState({
    userName: "",
    content: "",
    title: ""
  });
  const [id, setId] = useState("");

  const getUsers = async () => {
    try {
      const url = "http://localhost:3000/api/users";
      const res = await axios.get(url);
      const ok = res.data.ok;
      if (ok) {
        return (
          setUsers(res.data.user.map(user => user.userName)),
          setForm({ ...form, userName: res.data.user[0].userName })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setNotes = async e => {
    e.preventDefault();
    const { content, title, userName } = form;
    if (editing) {
      try {
        const url = `http://localhost:3000/api/notes/${id}`;
        const res = await axios.put(url, {
          title,
          content,
          author: userName,
          date
        });
        const ok = res.data.ok;
        if (ok) {
          getUsers();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const url = "http://localhost:3000/api/notes";
        const res = await axios.post(url, {
          title,
          content,
          author: userName,
          date
        });
        const ok = res.data.ok;
        if (ok) {
          getUsers();
        }
      } catch (error) {
        console.log(error);
      }
    }
    window.location.href = "/";
  };

  const getNoteForId = async () => {
    const url = `http://localhost:3000/api/notes/${props.match.params.id}`;
    const res = await axios.get(url);
    setForm(res.data.note);
    setDate(new Date(res.data.note.date));
  };

  const handleOnChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const memoizedCallback = useCallback(() => {
    return getUsers(), getNoteForId();
  });

  useEffect(() => {
    getUsers();
    if (props.match.params.id) {
      setEditing(true);
      setId(props.match.params.id);
      getNoteForId();
    }
    memoizedCallback();
  }, [setUsers, props.match.params.id, memoizedCallback]);

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
        <h4>{editing ? "Update a Note" : "Create a Note"}</h4>
        <form onSubmit={setNotes} autoComplete="off">
          <div className="form-group">
            <select
              name="userName"
              value={form.author}
              onChange={handleOnChange}
              className="form-control"
            >
              {users.map(user => (
                <option key={user} placeholder="Select User" value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <input
              type="text"
              name="title"
              required
              value={form.title}
              onChange={handleOnChange}
              className="form-control"
              placeholder="Title"
            />
          </div>

          <div className="form-group">
            <textarea
              name="content"
              required
              value={form.content}
              onChange={handleOnChange}
              className="form-control"
              placeholder="Content"
            />
          </div>

          <div className="form-group">
            <DatePicker
              className="form-control"
              selected={date}
              onChange={e => setDate(e)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            {editing ? "Edit" : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
