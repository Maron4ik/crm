const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    projectNumber: {
        type: Number,
        required: true
    },
    projectName: {
        type: String
    },
    projectCost: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('projects', projectSchema)