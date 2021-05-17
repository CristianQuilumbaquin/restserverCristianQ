const { request, response, json } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/user');
const { generarToken } = require('../helper/generar-jwt');


const login = async(req = request, res = response) => {
    const { correo, password } = req.body;



    try {

        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'usuario o contraseña incorrecta(Usuario)'
            });
        }


        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'usuario o contraseña incorrecta(Estado)'
            });
        }


        const validarPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                msg: 'usuario o contraseña incorrecta(Contraseña)'
            });
        }

        const token = await generarToken(usuario.id);


        res.json({
            msg: 'conexion exitosa',
            correo,
            password,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500), json({
            msg: 'Error, problemas del servidor'
        });
    }
}



module.exports = {
    login
}