const usersCtrl = {};

const User = require("../models/User");

usersCtrl.getUsers = async (req, res) => {
  await User.find().exec((err, user) => {
    if (err) {
      return res.status(400).json({
        ok: false
      });
    }

    res.json({
      ok: true,
      user
    });
  });
};

usersCtrl.createUsers = async (req, res) => {
  const { userName } = req.body;
  const newUser = new User({
    userName
  });

  await newUser.save((err, user) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      message: "El usuario se creo correctamente",
      user
    });
  });
};

usersCtrl.deleteUsers = async (req, res) => {
  await User.findByIdAndDelete(req.params.id, (err, user) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    if (!user) {
      return res.status(400).json({
        ok: false,
        message: "No se encrontro el usuario"
      });
    }

    res.json({
      ok: true,
      message: "El usuario se elimino correctamente",
      user
    });
  });
};

module.exports = usersCtrl;
