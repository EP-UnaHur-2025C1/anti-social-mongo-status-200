const mongoose = require('mongoose')

const conectarMongoDB = async () => {
    try {
        await mongoose.connection(process.env.MONGO_URI)
        console.log('Conexion con MongoDB exitosa')
    } catch (error) {
        console.log('Conexion con MongoDB Fallida: ' + error.message)
    }
}

module.exports= conectarMongoDB