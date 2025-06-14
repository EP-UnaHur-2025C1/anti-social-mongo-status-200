const express = require('express')
const conectarMongoDB = require('./config/db')
const commentRouter = require('./routes/commentRouter');
const post_imageRouter = require('./routes/post_imageRouter');
const postRouter = require('./routes/postRouter');
const tagRouter = require('./routes/tagRouter');
const userRouter = require('./routes/userRouter')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())

app.use('/comments', commentRouter)
app.use('/post_images', post_imageRouter)
app.use('/posts', postRouter)
app.use('/tags', tagRouter)
app.use('/users', userRouter)

conectarMongoDB()

app.listen(PORT, ()=>{
    console.log(`Servidor iniciado en el puerto ${PORT}`)
    console.log('UnaHur - Anti-Social net');
})