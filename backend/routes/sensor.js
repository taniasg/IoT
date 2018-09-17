var express = require('express');
var SensorController = require('../db/controllers/sensor');

var router = express.Router();

router.get('/test', SensorController.test);
router.post('/saveDataIoT', SensorController.saveDataIoT);
router.get('/sensors/hum', SensorController.getHum);
router.get('/sensors/temp', SensorController.getTemp);

module.exports = router;