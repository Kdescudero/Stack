import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateUser = () => {
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const url = "http://localhost:3000/api/users";
      const res = await axios.get(url);
      const ok  = res.data.ok;
      if (ok) {
        setUsers(res.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setUser = async e => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/api/users";
      const res = await axios.post(url, { userName });
      const ok  = res.data.ok;
      if (ok) {
        getUsers();
        setUserName("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async id => {
    try {
      const url = `http://localhost:3000/api/users/${id}`;
      const res = await axios.delete(url);
      const ok  = res.data.ok;
      if (ok) getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card card-body">
          <h3>Create New User</h3>
          <form onSubmit={setUser} autoComplete="off">
            <div className="form-group">
              <input
                type="text"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                className="form-control"
              />
            </div>
            <button
              type="submit"
              disabled={userName === ""}
              className="btn btn-primary"
            >
              Save
            </button>
          </form>
        </div>
      </div>

      <div className="col md-8">
        <ul className="list-group">
          {users.map(user => (
            <li
              key={user._id}
              onClick={() => deleteUser(user._id)}
              className="list-group-item list-group-item-action"
            >
              {user.userName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateUser;
