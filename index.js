const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')

//App Middlewares
app.use(express.json())
app.use(helmet())
app.use(cors())

//Import Routes
const belvoRoutes = require('./routes/belvoRoute')
const userRoutes = require('./routes/userRoute')

//Connect to MongoDB
dotenv.config({ path: './config.env' })

mongoose
    .connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB connection successful!'))
    .catch(err => console.log(err.message))

//Route Middlewares
app.use('/v1/belvo', belvoRoutes)
app.use('/v1/user', userRoutes)

const port = 8000
app.listen(process.env.PORT || port, () =>
    console.log(`Running on port ${port}`)
)