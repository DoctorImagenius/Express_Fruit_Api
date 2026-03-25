const express = require("express")
const { checkUrlMiddleware, checkHostMiddleware } = require("./middlewares/customMiddleware")
const { errorMidleware } = require("./middlewares/errorMiddleware")
const authRoutes = require("./routes/authRoutes")
const fruitRoutes = require("./routes/fruitRoutes")
const templateRoutes = require("./routes/templateRoutes")
const { configureDb } = require("./models/routeModel")
const {passport} = require("./config/passportConfig")
const env = require("dotenv")
env.config();

configureDb() 

const app = express()

app.set("view engine", "ejs") // view engine
app.use(passport.initialize()); // initialize passport for google signin
app.use(express.json()) // application middleware
app.use(checkUrlMiddleware) // custom middleware
app.use(checkHostMiddleware) // custom middleware
app.use("/auth", authRoutes); // auth routes
app.use("/fruits", fruitRoutes) // fruit routes
app.use("/template", templateRoutes) // template routes
app.use(errorMidleware) // error middleware

app.listen(process.env.PORT || 5000, () => {
    console.log("App is running at 5000 port...")
})