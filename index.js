require("dotenv").config(); // load from .env file

const server = require("./api/server.js");

server.get("/", (req, res) => {
  res.send("<h1>I'll serve soup</h1>");
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
