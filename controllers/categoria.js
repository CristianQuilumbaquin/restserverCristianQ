const { response, request } = require('express');
const Categoria = require('../models/categoria');

const { check, validationResult } = require('express-validator');

const CategoriaGet = async(req = request, res = response) => {
    const categoria = await Categoria.find();
    res.json({
        msg: 'API - GET - CATEGORIA',
        categoria,
    });
}

const CategoriaPost = async(req = request, res = response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors,
        })
    }

    const { nombre, estado, usuario } = req.body;
    const categoria = new Categoria({ nombre, estado, usuario });



    categoria.save();
    res.json({
        msg: 'API - POST',
        categoria
    });
}


const CategoriaPut = async(req = request, res = response) => {

    const id = req.params.id;
    const { nombre, ...resto } = req.body;

    const categoria = await Categoria.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'API - PUT',
        id,
        categoria,
    });

}
const CategoriaDelete = async(req = request, res = response) => {
    const id = req.params.id;
    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false });
    res.json({
        msg: 'API - DELETE',
        categoria,
    });
}
module.exports = {
    CategoriaGet,
    CategoriaPost,
    CategoriaPut,
    CategoriaDelete
}