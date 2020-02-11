const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const projectRouter = require('./routes/project')
const keys = require('./keys')
const bodyParser = require('body-parser')

const port = process.env.PORT || 5000
const clientPath = path.join(__dirname, 'client')

mongoose.connect(keys.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err))

const app = express()
app.use('/api/project', projectRouter)
app.use(express.static(clientPath))
app.use(bodyParser.json())

app.listen(port, () => {
    console.log(`working on port: ${port}`)
})