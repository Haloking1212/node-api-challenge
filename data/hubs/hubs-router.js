const express = require("express");
const router = express.Router();
const Hubs = require("./hubs-model.js");

//Get requests for Actions

router.get('/api/actions', (req, res) => {
    Hubs.get()
    .then( hubs => {
        res.status(200).json(hubs);
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: "Error getting actions" })
    })
})

module.exports = router;