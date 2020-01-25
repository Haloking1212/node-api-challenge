const express = require("express");
const router = express.Router();
const Hubs = require("./hubs-model.js");

//Get requests for actions

router.get('/api/actions', (req, res) => {
    Hubs.get()
    .then( hubs => {
        res.status(200).json(hubs);
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: "Error getting projects" })
    })
})

//Post request for actions

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
        res.status(500).json({ message: "Error posting projects" })
    })
})

//Delete Request for actions

router.delete("/api/actions/:id", (req, res) => {
    Hubs.remove(req.params.id)
    .then(count => {
        if(count > 0) {
            return res.status(200).json({ message: "Removal Granted!" })
        } else {
            return res.status(404).json({ message: "Bruh this post does not exist." })
        }
    })
    .catch( error => {
        console.log(error)
        res.status(500).json({ error:"The post could not be removed." })
    })
})

//Put Request for actions

router.put("/api/actions/:id", (req, res) => {
    const changes = req.body;
    Hubs.update(req.params.id, changes)
    .then(hub => {
        if(hub){
            return res.status(200).json(hub);
        } else {
            return res.status(404).json({ message:"The Post with the specified id" })
        }
    })
    .catch(error => {
        console.log(error)
        return res.status(500).json({ message: "This information could not be modified." })
    })
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Request for projects

//Get request for projects

router.get('/api/projects', (req, res) => {
    Hubs.getProjects()
    .then( hubs => {
        res.status(200).json(hubs);
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: "Error getting projects" })
    })
})

//Post request for projects

router.post('/api/projects', (req, res) => {
    const { description, name } = req.body
    // const project_id = req.params.id
    if(!description || !name){
        return res.status(404).json({ message: "Please provide a description and name." })
    }
    Hubs.insertProject(req.body)
    .then(hubs => {
        res.status(201).json(hubs);
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: "Error posting projects" })
    })
})

//Delete Request for projects

router.delete("/api/projects/:id", (req, res) => {
    Hubs.removeProject(req.params.id)
    .then(count => {
        if(count > 0) {
            return res.status(200).json({ message: "Removal Granted!" })
        } else {
            return res.status(404).json({ message: "Bruh this post does not exist." })
        }
    })
    .catch( error => {
        console.log(error)
        res.status(500).json({ error:"The post could not be removed." })
    })
})

//Put Request for projects

router.put("/api/projects/:id", (req, res) => {
    const changes = req.body;
    Hubs.updateProject(req.params.id, changes)
    .then(hub => {
        res.status(200).json(hub)
        // if(hub){
        //     return res.status(200).json(hub);
        // } else {
        //    return res.status(404).json({ message:"The Post with the specified id does not exist" })
        // }
    })
    .catch(error => {
        console.log(error)
        return res.status(500).json({ message: "This information could not be modified." })
    })
})



module.exports = router;