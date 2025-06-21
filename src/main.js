const express = require('express')
const conectarMongoDB = require('./config/db')
const {commentRouter, post_imageRouter, postRouter, tagRouter, userRouter} = require('./routes/index')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDoc = YAML.load('src/swagger.yaml')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())

app.use('/comments', commentRouter)
app.use('/post_images', post_imageRouter)
app.use('/posts', postRouter)
app.use('/tags', tagRouter)
app.use('/users', userRouter)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

conectarMongoDB()

app.listen(PORT, ()=>{
    console.log(`Servidor iniciado en el puerto ${PORT}`)
    console.log('UnaHur - Anti-Social net');
})