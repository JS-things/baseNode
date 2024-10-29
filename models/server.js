const express = require('express')
const cors=require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port=process.env.PORT
        this.usuariosPath='/api/usuarios';
        this.authPath='/api/auth'

        //conectar BD
        this.conectarDB()
        
        //middlewares
        this.middlewares()

        //rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection()

    }

    middlewares(){
        //fcors
        this.app.use(cors())

        //Lecutura y parseo del body
        this.app.use(express.json())
        //directorio publico
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.usuariosPath,require('../routes/user'))
        this.app.use(this.authPath,require('../routes/auth'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port)
        })
    }

}

module.exports = Server;