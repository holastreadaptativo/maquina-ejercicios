const mongoose = require('mongoose');

const ejercicioSchema = new mongoose.Schema({
    idEjercicio: {
        type: String,
        required: true,
        validate(value) {
            if (!value.length===15) {
                throw new Error('id ejercicio is invalid')
            }
        }
    },
    nivelHabilidad: {
        type: String
    },
    descripcion: {
        type: String
    }
});

const Ejercicio = mongoose.model('Ejercicio', ejercicioSchema);

module.exports = Ejercicio;