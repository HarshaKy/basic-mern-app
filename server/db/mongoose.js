var mongoose = require('mongoose')

// URI for local mongodb instance
var uri = 'mongodb://localhost:27017/MernApp'

mongoose.Promise = global.Promise
mongoose.connect( uri ,  { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useCreateIndex', true)

module.exports = {mongoose}