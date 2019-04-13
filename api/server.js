const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

//routes import - nothing for now

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

//server.use(routes)

module.exports = server;

