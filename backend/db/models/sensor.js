var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SensorSchema = Schema({
	sensor: String,
	value: Number,
	date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sensor', SensorSchema);