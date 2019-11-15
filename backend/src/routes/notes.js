const { Router } = require("express");
const router = Router();

const {
  getNote,
  getNotes,
  createNotes,
  updateNotes,
  deleteNotes
} = require("../controllers/notes.controller");

router
  .route("/api/notes")
  .get(getNotes)
  .post(createNotes);

router
  .route("/api/notes/:id")
  .get(getNote)
  .put(updateNotes)
  .delete(deleteNotes);

module.exports = router;
