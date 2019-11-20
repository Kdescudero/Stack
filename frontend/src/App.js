import React from "react";
import {
  CreateNote,
  CreateUser,
  Navigation,
  NotesList
} from "../src/components/index";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router>
      <Navigation />
      <div className="container p-4">
        <Route path="/" exact component={NotesList} />
        <Route path="/edit/:id" component={CreateNote} />
        <Route path="/crateNote" component={CreateNote} />
        <Route path="/createUser" component={CreateUser} />
      </div>
    </Router>
  );
};

export default App;
