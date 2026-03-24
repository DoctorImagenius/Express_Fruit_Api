const express = require("express")
const { checkUrlMiddleware, checkHeaderMiddleware } = require("./middlewares/userMiddleware")
const authRoutes = require("./routes/authRoutes")
const fruitRoutes = require("./routes/fruitRoutes")
const templateRoutes = require("./routes/templateRoutes")
const { errorMidleware } = require("./middlewares/errorMiddleware")
const { configureDb } = require("./models/routeModel")
const env = require("dotenv")
env.config();
const {passport} = require("./config/config")

configureDb() 

const app = express()

app.use(passport.initialize()); // initialize passport 
app.set("view engine", "ejs") // view engine
app.use(express.json()) // application middleware
app.use(checkUrlMiddleware) // custom middleware
app.use(checkHeaderMiddleware) // custom middleware
app.use("/auth", authRoutes); // auth routes
app.use("/fruits", fruitRoutes) // fruit routes
app.use("/template", templateRoutes) // template routes
app.use(errorMidleware) // error middleware

app.listen(5000, () => {
    console.log("App is running at 5000 port...")
})