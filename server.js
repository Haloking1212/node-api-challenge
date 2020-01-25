const express = require("express");

const hubsRouter = require("./data/hubs/hubs-router");

const server = express()
server.use(express.json());

server.use("/", hubsRouter);

server.get("/", (req, res) => {
    res.send(`
    <h2>node-api-challenge`)
})

module.exports = server