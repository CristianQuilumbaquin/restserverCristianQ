const { response, request } = require('express');
const jwt = require('jsonwebtoken');


const validarJWT = (req = request, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(400).json({
            msg: 'No hay token'
        });
    }
    try {
        jwt.verify(token, 'Cris123FTTU');
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'El Token no ha sido valido'
        });

    }

};



module.exports = {
    validarJWT,

}