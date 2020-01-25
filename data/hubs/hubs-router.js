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

//Post request for Actions

router.post('/api/actions', (req, res) => {
    const { description, notes } = req.body
    const project_id = req.params.id
    if(!description || !notes || project_id){
        return res.status(404).json({ message: "Please provide a description, notes and previous project id" })
    }
    Hubs.insert(req.body)
    .then(hubs => {
        res.status(201).json(hubs);
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: "Error posting actions" })
    })
})

module.exports = router;