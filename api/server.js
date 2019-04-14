const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

//routes import - nothing for now
const userRoutes = require("../routes/user-routes");
const itemRoutes = require("../routes/item-routes");

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

//server.use(routes)
server.use(userRoutes);
server.use(itemRoutes);

module.exports = server;
