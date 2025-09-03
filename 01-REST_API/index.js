const express =  require('express')
const {connectMongoDB} = require('./connection')

const userRouter = require("./routes/user")
const {logReqRes} = require("./middlewares/index")

const PORT = 8000;
const app = express();


// appending the mongoose connection module
connectMongoDB("mongodb://127.0.0.1:27017/Practice").then(
    () => console.log("MongoDb connected")
)

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }))


// appending the middleware function
app.use(logReqRes("log.txt"));


// appending the user router functioins
app.use("/api/users" , userRouter)

app.listen(PORT , () => {
    console.log(`Server started at PORT: ${PORT}`)
})


