const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    userName: {
      type: String,
      trim: true, // Limpiar los espacios en blanco
      unique: true, // El nombre debe de ser unico
      require: [true, "El campo es requerido"]
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("User", userSchema);
