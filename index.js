var http = require('http')
var express = require('express')
var app = express()
var GSheet = require('./app')
var bodyParser = require('body-parser')
var cors = require('cors')
app.use('/static', express.static('public'))
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.post('/freelancer', GSheet)
var server = http.createServer(app)
server.listen(8080);
