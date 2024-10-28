const express = require('express')
const cors=require('cors')

class Server {

    constructor() {
        this.app = express();
        this.port=process.env.PORT
        this.usuariosPath='/api/usuarios';
        
        //middlewares
        this.middlewares()

        //rutas de mi aplicacion
        this.routes();
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
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port)
        })
    }

}

module.exports = Server;