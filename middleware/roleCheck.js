//not implemented for now in the server

module.exports = (req, res, next) => {
  if (req.decodedToken.role.includes("manager")) {
    next();
  } else {
    res.status(403).json({ message: "You don't have access" });
  }
};
