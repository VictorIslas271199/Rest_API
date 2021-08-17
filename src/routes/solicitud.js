const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET ALL SOLICITUDES
router.get('/solicitud', (req, res) => {
    mysqlConnection.query('SELECT * FROM solicitud', (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });  
  });

    // GET AN SOLICITUD
router.get('/buscarSolicitud/:id', (req, res) => {
    const { id } = req.params; 
    mysqlConnection.query('SELECT * FROM prestamo WHERE id_solicitud = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
  });

    // DELETE AN SOLICITUD
router.delete('/eliminarSolicitud/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM solicitud WHERE id_solicitud = ?', [id], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Solicitud borrada'});
      } else {
        console.log(err);
      }
    });
  });

    // INSERT AN SOLICITUD
router.post('/insertarSolicitud', (req, res) => {
    const {id, estado_solicitud, id_usuario, id_comunidad} = req.body;
    console.log(id, estado_solicitud, id_usuario, id_comunidad);
    const query = `
      SET @id = ?;
      SET @estodo_solicitud = ?;
      SET @id_usuario = ?;
      SET @id_comunidad = ?;
      CALL AddOrEditProducto(@id, @estodo_solicitud, @id_usuario, @id_comunidad );
    `;
    mysqlConnection.query(query, [id, estado_solicitud, id_usuario, id_comunidad], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Prestamo guardado'});
      } else {
        console.log(err);
      }
    });
  });

  // UPDATE AN SOLICITUD
router.put('/actualizarSolicitud/:id', (req, res) => {
    const { estado_solicitud, id_usuario, id_comunidad } = req.body;
    const { id } = req.params;
    const query = `
    SET @id = ?;
    SET @estodo_solicitud = ?;
    SET @id_usuario = ?;
    SET @id_comunidad = ?;
    CALL AddOrEditProducto(@id, @estodo_solicitud, @id_usuario, @id_comunidad );
    `;
    mysqlConnection.query(query, [id, estado_solicitud, id_usuario, id_comunidad], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Solicitud Actualizada'});
      } else {
        console.log(err);
      }
    });q
  });
  
  module.exports = router;