const express = require('express')
const { conectarMongoDB } = require('./config/db')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

conectarMongoDB()

console.log(`Servidor iniciado en el puerto ${PORT}`);
console.log('UnaHur - Anti-Social net');
 