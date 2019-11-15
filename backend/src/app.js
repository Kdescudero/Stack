const express = require("express");
const cors = require("cors");

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middleware
app.use(cors());
app.use(express.json());

// Routers
app.use(require("./routes/index.js"));

module.exports = app;
