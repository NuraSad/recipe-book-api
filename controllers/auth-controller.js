const config = require("../config/auth-config");

const User = require("../models/user-model");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user
    .save()
    .then(() => {
      res.status(200).send({ username: user.username });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
      return;
    });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  }).then((user, err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      username: user.username,
      accessToken: token,
    });
  });
};
