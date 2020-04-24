const express = require('express')
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb')

var {User} = require('./models/user')
var {mongoose} = require('./db/mongoose')

var app = express()
const port = 3000

app.use(bodyParser.json())

app.get('', (req, res) => {
    res.send('hello world')
})

app.post('/users', (req, res) => {
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        addresses: req.body.addresses
    })

    user.save().then((doc) => {
        res.send(doc)
    }, (e) => {
        res.status(400).send(e)
    })
})

app.get('/users', (req, res) => {
    User.find().then((users) => {
        res.send({users})
    }, (e) => {
        res.status(400).send(e)
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})