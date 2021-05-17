const mongoose = require('mongoose');

const dbConectar = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/', {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        })
        console.log('se ha conectado a la base de datos exitosamente');
    } catch (error) {
        console.log('No  ha conectado a la base de datos fail');
        console.log(error);
    }




};

module.exports = {
    dbConectar,
};