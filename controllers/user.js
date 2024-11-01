const { response, request } = require('express')
const bcryptjs = require('bcryptjs')


const Usuario = require('../models/usuario')
const { validationResult } = require('express-validator')

const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true }

/*     const usuarios = await Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))

    const total = await Usuario.countDocuments(query); */

    const [total,usuarios] =await  Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))

    ])

    res.json({
        total,
        usuarios
    })
}

const usuariosPost = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }

    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({ nombre, correo, password, rol });//creacion de la instancia

    //verificar correo existe


    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    //Guardar en BD
    await usuario.save()//guardar

    res.json({

        usuario
    })
}

const usuariosPut = async (req, res) => {

    const { id } = req.params

    const { _id, password, google, correo, ...resto } = req.body

    if (password) {
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)

    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)


    res.json(usuario)
}

const usuariosDelete = async (req, res=response) => {

    const{id}=req.params

    const uid=req.uid
    
    //fisicamente lo borramos
/*     const usuario= await Usuario.findByIdAndDelete(id); */

    const usuario=await Usuario.findByIdAndUpdate(id,{estado:false})
/*     const usuarioAutenticado=req.usuario */

    res.json({usuario/* ,usuarioAutenticado */})
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}