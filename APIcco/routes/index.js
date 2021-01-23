
const express = require('express');
const app = express();

var productos = require('../models/producto.js');

	//GET - consultar todos los productos
	findAllproductos = function (req, res) {
		productos.find(function (err, producto) {
			if (!err) {
				res.json({
					ok: true,
					producto
				})

			} else {
				console.log('ERROR: ' + err);
			}
		});
	};

	//GET - consultar por el Id de producto
	findById = function (req, res) {
	let id = req.params.id;
  productos.find({_id: id})
	.exec((err, productoData)=>{
		if (err) {
			return res.status(404).json({
				ok: false,
				err: {
					message: "No encontrado, el recurso solicitado no existe."
				}
			})
		}

		res.send(productoData)
	})
	};

	//POST - agregar producto
	addproducto = function (req, res) {
		let body = req.body
		
		var producto = new productos({
      nombre: body.nombre,
      caracteristicas: body.caracteristicas,
      fechaLanz: body.fechaLanz,
      correoFab: body.correoFab,
      paisFab: body.paisFab,
      precio: body.precio,
      uniDisp: body.uniDisp,
      unidVend: body.unidVend
		});

		producto.save(function (err) {
			if (!err) {
				console.log('Created');
			} else {
				console.log('ERROR: ' + err);
			}
		});

		res.send(producto);
	};

	//PUT - actualizar producto
	updateproducto = function (req, res) {
  let id = req.params.id;
  let data = req.body;

  let body = {
    nombre: data.nombre,
    caracteristicas: data.caracteristicas,
    fechaLanz: data.fechaLanz,
    correoFab: data.correoFab,
    paisFab: data.paisFab,
    precio: data.precio,
    uniDisp: data.uniDisp,
    unidVend: data.unidVend
  }

  productos.findByIdAndUpdate(id, body, (err, productoData)=> {
    if(err) {
      return res.status(404).json({
        ok:false,
        err: {
          message: "El recurso solicitado no existe."
        }
      })
    }

    if(!productoData) {
      return res.status(400).json({
        ok:false,
        err: {
          message: 'producto no encontrado'
        }
      })
    }
    res.send(productoData)
  })
	}

	//DELETE - Borrar producto
	deleteproducto = function (req, res) {
		let id= req.params.id

		productos.findByIdAndRemove(id, (err, productoDelete) => {
	
			if(err) {
				return res.status(400).json({
					ok:false,
					err
				})
			} 
			if(!productoDelete) {
				return res.status(400).json({
					ok:false,
					err: {
						message: 'producto no encontrado'
					}
				})
			}
	
			res.json({
				ok:true,
				message: "producto Borrado"
			})
		})
	}

	//punto de entrada de los metodos 

	app.get('/api/productos', findAllproductos);
	app.get('/api/producto/:id', findById);
	app.post('/api/producto', addproducto);
	app.put('/api/producto/:id', updateproducto);
  app.delete('/api/producto/:id', deleteproducto);
  
  module.exports = app