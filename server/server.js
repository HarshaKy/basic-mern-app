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

app.get('/users/id/:id', (req, res) => {
    var id = req.params.id

    if(!ObjectID.isValid(id)) {
        res.status(404).send('Not Valid')
    }

    User.findById(id).then((user) => {
        if(!user) {
            res.status(404).send('User not found')
        }
        res.send({user})
    }).catch((e) => console.log('Invalid ID'))
})

app.get('/users/name/:name', (req, res) => {
    var name = req.params.name

    User.find({name}).then((user) => {
        if(Object.keys(user).length == 0) {
            res.status(404).send('User not found')
        }
        res.send({user})
    }).catch((e) => console.log('Invalid ID'))
})

app.get('/users/address/:address', (req, res) => {
    var address = req.params.address

    var search = {
        addresses: {
            hometown: address
        }
    }

    User.find({search}).then((user) => {
        res.send({user})
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})