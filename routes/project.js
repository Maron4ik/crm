const express = require('express')
const router = express.Router()
const Project = require('../models/Project')

router.get('/', async (req, res) => {
    const projects = await Project.find({})
    res.status(200).json(projects)
})

router.post('/', async (req, res) => {

    const projectData = {
        projectNumber: req.body.projectNumber,
        projectName: req.body.projectName,
        projectCost: req.body.projectCost
    }

    const Project = new Project(projectData)

    await project.save()
    res.status(201).json(project)

})

router.delete('/:projectId', async (req, res) => {
    await Project.remove({
        _id: req.params.projectId
    })
    res.status(200).json({
        message: 'deleted'
    })
})


module.exports = router