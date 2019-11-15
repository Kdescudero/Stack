const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
  {
    title: String,
    content: {
      type: String,
      required: [true, "Este Campo es requerido"]
    },
    author: String,
    date: {
      type: String,
      default: new Date()
    }
  },
  {
    // Control de la hora en que se agrego la nota y Control de la hora en que se actualizo la nota
    timestamps: true
  }
);

module.exports = model("Note", noteSchema);
