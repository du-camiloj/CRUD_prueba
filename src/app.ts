import express from "express"
import "reflect-metadata"
import userRoutes from './routes/users.routes'
import ProductRoutes from './routes/products.routes'


const app = express()


//puerto de variable de entorno o 4000
app.set('port', process.env.PORT || 4000)
app.use(express.json())
app.use(express.urlencoded({extended: false}))



app.use(userRoutes)
app.use(ProductRoutes)
// app.use("/api/v1/products",require('./routes/products.routes'))
// app.use("/api/v1/users",require('./routes/users.routes'))

module.exports =  app