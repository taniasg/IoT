var Sensor = require('../models/sensor');

var moment = require('moment'); 

function test(req, res) {
	res.status(200).send({
		'message': 'Test'
	});
}

function saveDataIoT(req, res) {
	var sensor = new Sensor(null, null, null);
	var params = req.body;

	sensor.sensor = params.sensor;
	sensor.value = params.value;

	sensor.save(res.status(200).send('Done'));

}

function getHum(req, res) {
	res.header("Access-Control-Allow-Origin", "*");

	Sensor.find({
		sensor:'HUM', 
		date: { $gt: moment().subtract(15, 'minutes')}
	}, { __v:0 }).sort({
		date: 1
	}).then((data) => {
		res.send(data);
	});
}

function getTemp(req, res) {
	res.header("Access-Control-Allow-Origin", "*");

	Sensor.find({
		sensor:'TEMP', 
		date: { $gt: moment().subtract(15, 'minutes')}
	}, { __v:0 }).sort({
		date: 1
	}).then((data) => {
		res.send(data);
	});
}

module.exports = {
	test,
	saveDataIoT,
	getHum,
	getTemp
};