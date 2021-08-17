const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET ALL PRESTAMOS
router.get('/prestamo', (req, res) => {
    mysqlConnection.query('SELECT * FROM prestamo', (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });  
  });

  // GET AN PRESTAMO
router.get('/buscarPrestamo/:id', (req, res) => {
    const { id } = req.params; 
    mysqlConnection.query('SELECT * FROM prestamo WHERE id_prestamo = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
  });

  // DELETE AN PRESTAMO
router.delete('/eliminarPrestamo/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM prestamo WHERE id_prestamo = ?', [id], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Prestamo borrado'});
      } else {
        console.log(err);
      }
    });
  });

  // INSERT AN PRESTAMO
router.post('/insertarPrestamo', (req, res) => {
    const {id, estado_prestamo, fecha_prestamo, fecha_devolucion, idUsuario, id_producto} = req.body;
    console.log(id, estado_prestamo, fecha_prestamo, fecha_devolucion, idUsuario, id_producto);
    const query = `
      SET @id = ?;
      SET @estado_prestamo = ?;
      SET @fecha_prestamo = ?;
      SET @fecha_devolucion = ?;
      SET @idUsuario = ?;
      SET @id_producto = ?;
      CALL AddOrEditProducto(@id, @estado_prestamo, @fecha_prestamo, @fecha_prestamo, @fecha_devolucion, @idUsuario, @id_producto );
    `;
    mysqlConnection.query(query, [id, estado_prestamo, fecha_prestamo, fecha_devolucion, idUsuario, id_producto], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Prestamo guardado'});
      } else {
        console.log(err);
      }
    });
  });

  // UPDATE AN PRESTAMO
router.put('/actualizarPrestamo/:id', (req, res) => {
    const { estado_prestamo, fecha_prestamo, fecha_devolucion, idUsuario, id_producto } = req.body;
    const { id } = req.params;
    const query = `
      SET @id = ?;
      SET @estado_prestamo = ?;
      SET @fecha_prestamo = ?;
      SET @fecha_devolucion = ?;
      SET @idUsuario = ?;
      SET @id_producto = ?;
      CALL AddOrEditProducto(@id, @estado_prestamo, @fecha_prestamo, @fecha_prestamo, @fecha_devolucion, @idUsuario, @id_producto);
    `;
    mysqlConnection.query(query, [id, estado_prestamo, fecha_prestamo, fecha_devolucion, idUsuario, id_producto], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Prestamo Actualizado'});
      } else {
        console.log(err);
      }
    });
  });
  
  module.exports = router;