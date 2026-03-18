const express = require("express")
const {checkUrlMiddleware, checkHeaderMiddleware} = require("./middlewares/userMiddleware")
const fruitRoutes = require("./routes/fruitRoutes")
const templateRoutes = require("./routes/templateRoutes")
const {errorMidleware} = require("./middlewares/errorMiddleware")
const {configureDb} = require("./models/routeModel")

const app = express()

app.set("view engine", "ejs") // view engine

configureDb()

app.use(express.json()) // application middleware
app.use(checkUrlMiddleware) // custom middleware
app.use(checkHeaderMiddleware) // custom middleware
app.use("/fruits", fruitRoutes) // fruit routes
app.use("/template", templateRoutes) // template routes
app.use(errorMidleware) // error middleware

app.listen(3000, () => {
    console.log("App is running...")
})