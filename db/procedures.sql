USE company;

USE LENDERS

-- PRECEDIMIENTO AGREGAR O EDITAR PRODUCTO

DELIMITER $$

CREATE PROCEDURE `AddOrEditProducto` (
  IN _id INT,
  IN _name VARCHAR(45),
  IN _descripcion VARCHAR(45),
  IN _fotografia VARCHAR(45),
  IN _idCatalogo INT
)
BEGIN 
  IF _id = 0 THEN
    INSERT INTO producto (nom_producto, descripcion, fotografia, id_catalogo)
    VALUES (_name, _descripcion, _fotografia, _idCatalogo);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE producto
    SET
    nom_producto = _name,
    descripcion = _descripcion,
    fotografia = _fotografia,
    id_catalogo = _idCatalogo
    WHERE id_producto = _id;
  END IF;

  SELECT _id AS 'id';
END

$$

-- PRECEDIMIENTO AGREGAR O EDITAR USUARIO

DELIMITER $$

CREATE PROCEDURE `AddOrEditUsuario` (
  IN _id_u INT,
  IN _usuario VARCHAR(50),
  IN _pasword VARCHAR(255),
  IN _id_r VARCHAR(50),
  IN _foto VARCHAR(50),
  
)
BEGIN 
  IF _id = 0 THEN
    INSERT INTO usuarios (usuarioutp, pasword, id_r, foto)
    VALUES (_usuario, _pasword, _id_r, _foto);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE usuarios
    SET
    usuarioutp = _usuario,
    pasword = _pasword,
    id_r = _id_r,
    foto = _foto
    WHERE id_u = _id_u;
  END IF;

  SELECT _id_u AS 'id';
END

$$