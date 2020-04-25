// import libs required

const express = require('express')
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb')

var {User} = require('./models/user')
var {mongoose} = require('./db/mongoose')

// initialize express and set port number
var app = express()
const port = 3000

// telling the app to use bodyparser.json method
app.use(bodyParser.json())

// the "front page" of the app
app.get('', (req, res) => {
    res.send('hello world')
})

// route to create user
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

// route to fetch all users
app.get('/users', (req, res) => {
    User.find().then((users) => {
        res.send({users})
    }, (e) => {
        res.status(400).send(e)
    })
})

// search user by id
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

// search user by name
app.get('/users/name/:name', (req, res) => {
    var name = req.params.name

    User.find({name}).then((user) => {
        if(Object.keys(user).length == 0) {
            res.status(404).send('User not found')
        }
        res.send({user})
    }).catch((e) => console.log('Invalid ID'))
})

// search user by address
app.get('/users/address/:address', (req, res) => {
    var address = req.params.address

    User.find({ "addresses.current": address }).then((user) => {
        res.send(user)
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})