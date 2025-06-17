const mongoose = require('mongoose')
require('dotenv').config()

const conectarMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Conexión con MongoDB exitosa')
    } catch (error) {
        console.log('Conexión con MongoDB Fallida: ', error.message)
    }
}

module.exports = conectarMongoDB