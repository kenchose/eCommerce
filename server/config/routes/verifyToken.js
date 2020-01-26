const jwt = require('jsonwebtoken');

//MIDDLEWARE FUNCTION THAT VERIFIES TOKENM FOR ROUTE PROTECTION

module.exports = function (req, res, next) {
  let token = req.header('Authorization');
  console.log('token', token)
  if (!token) return res.status(401).send("Access denied!");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
}
