var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/IoT',  { useNewUrlParser: true })
	.then(() => {
		console.log('La conexión a la BD IoT ha sido exitosa');
	})
	.catch(error => console.log(err));