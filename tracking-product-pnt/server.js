

var express = require('express')
var bodyParser = require('body-parser')
var http = require('http')
var app = express()
var mongoose = require('mongoose')

if(typeof process.env.PROD_MONGODB !== 'undefined'){
	mongoose.connect(process.env.PROD_MONGODB);

}else{
	mongoose.connect('mongodb://localhost/inventorydb');
}
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.json());

app.set('port', (process.env.PORT || 3000))

app.use(express.static(__dirname + '/public'))

var routes = require('./routes')(app)

var server = http.createServer(app).listen(app.get('port'),function(){
	console.log('Online port: ' + + app.get('port'))
})

// var io = require('socket.io').listen(server)

// io.on('connection',function(socket){
// 	console.log('one guy is in')

// 	socket.on('chat message',function(msg){
// 		console.log('message: ' + msg)
// 		io.emit('chat message', msg)
// 	})

// 	socket.on('disconnect',function(){
// 		console.log('one guy is out')
// 	})
// })


