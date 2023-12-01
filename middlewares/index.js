const verifyToken = require("./authJwt");
const checkDuplicateUsernameOrEmail = require("./verifySignUp");

module.exports = {
  verifyToken,
  checkDuplicateUsernameOrEmail,
};
