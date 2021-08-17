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
  IN _id INT,
  IN _correo VARCHAR(50),
  IN _contraseña VARCHAR(255),
  IN _foto_perfil VARCHAR(50),
  IN _nombre VARCHAR(50),
  IN _apellidoP VARCHAR(50),
  IN _apellidoM VARCHAR(50),
  IN _telefono VARCHAR(50),
  IN _img_identificacion VARCHAR(50),
  IN _codigo_personal VARCHAR(50),
  IN _codigo_recomendacion VARCHAR(50),
  IN _fecha_registro VARCHAR(50),
  IN _id_rol_usuario INT
)
BEGIN 
  IF _id = 0 THEN
    INSERT INTO usuario (correo, contraseña, foto_perfil, nombre, apellidoP, apellidoM, telefono, img_identificacion, codigo_personal, codigo_recomendacion, fecha_registro, id_rol_usuario)
    VALUES (_correo, _contraseña, _foto_perfil, _nombre, _apellidoP, _apellidoM, _telefono, _img_identificacion, _codigo_personal, _codigo_recomendacion, _fecha_registro, _id_rol_usuario);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE usuario
    SET
    correo = _correo,
    contraseña = _contraseña,
    foto_perfil = _foto_perfil,
    nombre = _nombre,
    apellidoP = _apellidoP,
    apellidoM = _apellidoM,
    telefono = _telefono,
    img_identificacion = _img_identificacion,
    codigo_personal = _codigo_personal,
    codigo_recomendacion = _codigo_recomendacion,
    fecha_registro = _fecha_registro,
    id_rol_usuario = _id_rol_usuario
    WHERE id_usuario = _id;
  END IF;

  SELECT _id AS 'id';
END

$$