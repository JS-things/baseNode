const { Router } = require('express')
const { check } = require('express-validator')
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/user')


const {validarCampos,validarJWT,tieneRole,esAdminRole}=require('../middlewares')


const {esRoleValido, emailExiste, existeUsuarioPorId}=require('../helpers/db-validators')
const Role = require('../models/role')

const router = Router()


router.get('/', usuariosGet)

router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmail(),
        check('password', 'El password debe ser mas de 6 letras').isLength({min:6}),
        check('correo', 'El correo no es valido').isEmail(),
        check('correo').custom(emailExiste),
       /*  check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']), */
       check('rol').custom(esRoleValido),
        validarCampos
    ]
    , usuariosPost)

router.put('/:id', [
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPut)



router.delete('/',
    [
        validarJWT,
        /* esAdminRole, */
        tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
        check('id','No es un ID valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos
    ]
    , usuariosDelete)



module.exports = router;