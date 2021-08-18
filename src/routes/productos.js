const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all usuarios
router.get('/inventario', (req, res) => {
  mysqlConnection.query('SELECT * FROM inventarioe', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

//Get disponibles
router.get('/inventarioDisponible', (req, res) => {
  mysqlConnection.query('select * from inventarioe where tipoEquipo="EP" and estado=1', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

//Get dañados
router.get('/inventarioDanado', (req, res) => {
  mysqlConnection.query('select * from inventarioe where tipoEquipo="ED" and estado=1', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET VISTA PRODUCTOS
router.get('/vistaProductos', (req, res) => {
  mysqlConnection.query('CALL GetVistaProductos', (err, rows, fields) => {
    if(!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });  
});

// GET An usuario
router.get('        :id', (req, res) => {
  var { id } = req.params;
  id = '%'+id+'%';
  mysqlConnection.query('SELECT * FROM inventarioe WHERE id_equipo LIKE ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// DELETE An usuario
router.delete('/eliminarProducto/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM inventarioe WHERE id_equipo = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'equipo eliminado'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An usuario
router.post('/insertarProducto', (req, res) => {
  const {id, nombre, descripcion, fotografia, idCatalogo} = req.body;
  console.log(id, nombre, descripcion, fotografia, idCatalogo);
  const query = `
    SET @id = ?;
    SET @nombre = ?;
    SET @descripcion = ?;
    SET @fotografia = ?;
    SET @idCatalogo = ?;
    CALL AddOrEditProducto(@id, @nombre, @descripcion, @fotografia, @idCatalogo);
  `;
  mysqlConnection.query(query, [id, nombre, descripcion, fotografia, idCatalogo], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Producto Saved'});
    } else {
      console.log(err);
    }
  });
});

// UPDATE An usuario
router.put('/actualizarProducto/:id', (req, res) => {
  const { nombre, descripcion, fotografia, idCatalogo } = req.body;
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @nombre = ?;
    SET @descripcion = ?;
    SET @fotografia = ?;
    SET @idCatalogo = ?;
    CALL AddOrEditProducto(@id, @nombre, @descripcion, @fotografia, @idCatalogo);
  `;
  mysqlConnection.query(query, [id, nombre, descripcion, fotografia, idCatalogo], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Producto Updated'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;