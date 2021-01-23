var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var productoSchema = new Schema({
	nombre: { type: String },
	caracteristicas: { type: String },
	fechaLanz: { type: String },
	correoFab: { type: String },
	paisFab: { type: String},
	precio: { type: Number},
	uniDisp: { type: Number},
	unidVend: { type: Number},
	img: { type: String},
});


module.exports = mongoose.model('productos', productoSchema);