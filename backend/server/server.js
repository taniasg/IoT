var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var db = require('../db/db');

var sensor_routes = require('../routes/sensor');

var Sensor = require('../db/models/sensor');

app.get('/', function(req, res) {
	res.status(200).send("Hello World");
});

app.use('/iot', sensor_routes);

io.on('connection', (socket)  => {
	console.log('Connection established');
	socket.on('iot/sensors', (data) => {
		var sensor = new Sensor({sensor: data.sensor, value: data.value });
		sensor.save();
		
		io.emit('data', {
			change : "true"
		});
	});
});

server.listen(8000, () => {
	console.log('Servidor corriendo en http://localhost:8000');
});