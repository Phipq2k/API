const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const logger = require('morgan')



//connect Mongodb by mongoose
mongoose.connect('mongodb+srv://tranquocphi:conga2020@cluster0.k5hqw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => console.log('Connected database is successfully from mongodb'))
    .catch((error) => console.log(`Connect database is failed with error which is ${error}`))

//import Routes
const productRoutes = require('./mvc/routes/product')
const userRoutes = require('./mvc/routes/user')

const app = express()

//Middleware
app.use(logger('dev'))
app.use(bodyParser.json())


//Routes
app.get('/', (req, res, next) => {
    return res.status(201).json({
        message: 'Server is OK!'
    })
})
app.use('/product', productRoutes)
app.use('/user', userRoutes)



//catch 404 error and forward them to error handler
app.use((req, res, next) => {
    const err = new Error('Not found')
    err.status = 404
    next(err)

})

//Error handler function 
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500

    //respon to client
    return res.status(status).json({
        error: {
            message: error.message
        }

    })
})

//Start server
const SERVER_PORT = app.get('port') || 3000
app.listen(SERVER_PORT, () => {
    console.log(`Server runing is port ${SERVER_PORT}`)
})