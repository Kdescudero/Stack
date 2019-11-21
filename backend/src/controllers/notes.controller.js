const notesCtrl = {};

const Note = require("../models/Notes");

notesCtrl.getNote = async (req, res) => {
  await Note.findById(req.params.id).exec((err, note) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: "La nota no se a encontrado",
        err
      });
    }

    if (!note) {
      return res.status(400).json({
        ok: false,
        message: "La nota no se a encontrado"
      });
    }

    res.json({
      ok: true,
      note
    });
  });
};

notesCtrl.getNotes = async (req, res) => {
  await Note.find().exec((err, notes) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      notes
    });
  });
};

notesCtrl.createNotes = async (req, res) => {
  const { title, content, author, date } = req.body;
  const newNote = new Note({
    title,
    content,
    author,
    date
  });

  await newNote.save((err, note) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      message: "La nota se agrego correctamente",
      note
    });
  });
};

notesCtrl.updateNotes = async (req, res) => {
  const { title, content, author, date } = req.body;
  await Note.findByIdAndUpdate(
    req.params.id,
    {
      title,
      content,
      author,
      date
    },
    { new: true, runValidators: true },
    (err, note) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        message: "La nota se actualizo correctamente",
        note
      });
    }
  );
};

notesCtrl.deleteNotes = async (req, res) => {
  await Note.findByIdAndDelete(
    req.params.id,
    (err, note) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      if(!note){
        return res.status(400).json({
          ok: false,
          message : "No se encontro la nota",
          err
        });
      }

      res.json({
        ok: true,
        message: "La nota se elimino correctamente",
        note
      });
    }
  );
};

module.exports = notesCtrl;
