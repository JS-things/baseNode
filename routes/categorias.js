const { Router } = require('express')
const { check } = require('express-validator')

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categoria');
const { existeCategoria } = require('../helpers/db-validators');

const router = Router();


//Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

//Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos

], obtenerCategoria);


//Crear categoria ' privado' ccualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);


//Actualizar - privado-cualquier token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().notEmpty(),
    check('id').custom(existeCategoria),
    validarCampos
], actualizarCategoria);

//Borar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], borrarCategoria);

module.exports = router;