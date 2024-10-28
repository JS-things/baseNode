const {response,request}=require('express')

const usuariosGet=(req=request, res=response) => {

    const {q,nombre,apikey}=req.query

    res.json({
    
        msg:"get api",
        query
    })
}

const usuariosPost= (req, res) => {
    const body=req.body

    res.json({
    
        msg:"post api",
        body
    })
}

const usuariosPut=(req, res) => {

    const {id}= req.params

    res.json({
    
        msg:"put api",
        id
    })
}

const usuariosDelete=(req, res) => {
    res.json({
    
        msg:"delete api"
    })
}




module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}