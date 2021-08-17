const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database.js');

// GET all usuarios
router.get('/usuarios', (req, res) => {
    mysqlConnection.query('SELECT * FROM usuarios', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

// GET An usuario
router.get('/buscarUsuario/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM usuarios WHERE id_u = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

// DELETE An usuario
router.delete('/eliminarUsuario/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM usuarios WHERE id_u = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Usuario Deleted' });
        } else {
            console.log(err);
        }
    });
});

// INSERT An usuario
router.post('/insertarUsuario', (req, res) => {
    const { id_u, usuarioutp, pasword, id_r, foto } = req.body;
    console.log(id_u, usuarioutp, pasword, id_r, foto);
    const query = `
    SET @id_u = ?;
    SET @usuarioutp = ?;
    SET @pasword = ?;
    SET @id_r = ?;
    SET @foto = ?;
    CALL AddOrEditUsuario(@id_u, @usuarioutp, @pasword, @id_r, @foto);
  `;
    mysqlConnection.query(query, [id_u, usuarioutp, pasword, id_r, foto], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Usuario Saved' });
        } else {
            console.log(err);
        }
    });
});

// UPDATE An usuario
router.put('/actualizarUsuario/:id', (req, res) => {
    const { correo, contraseña, foto_perfil, nombre, apellidoP, apellidoM, telefono, img_identificacion, codigo_personal, codigo_recomendacion, fecha_registro, id_rol_usuario } = req.body;
    const { id } = req.params;
    const query = `
    SET @id_u = ?;
    SET @usuarioutp = ?;
    SET @pasword = ?;
    SET @id_r = ?;
    SET @foto = ?;
    CALL AddOrEditUsuario(@id_u, @usuarioutp, @pasword, @id_r, @foto);
  `;
    mysqlConnection.query(query, [id_u, usuarioutp, pasword, id_r, foto], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Usuario Updated' });
        } else {
            console.log(err);
        }
    });
});

router.post("/iniciarSesion", (req, res) => {
    const { usuarioutp, pasword } = req.body;
    console.log(usuarioutp, pasword);
    const query = `
        SET @usuarioutp = ?;
        SET @pasword = ?;
        CALL logUser(@usuarioutp,@pasword);
        `;
    mysqlConnection.query(query, [usuarioutp, pasword], (err, rows, fields) => {
        if (!err) {
        res.json(rows[2]);
        } else {
        console.log(err);
        }
    });
});

module.exports = router;