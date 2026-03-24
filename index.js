const express = require("express")
const { checkUrlMiddleware, checkHeaderMiddleware } = require("./middlewares/userMiddleware")
const authRoutes = require("./routes/authRoutes")
const fruitRoutes = require("./routes/fruitRoutes")
const templateRoutes = require("./routes/templateRoutes")
const { errorMidleware } = require("./middlewares/errorMiddleware")
const { configureDb } = require("./models/routeModel")
const fs = require("fs/promises")
const jwt = require("jsonwebtoken")
const path = require("path")
const usersFilePath = path.join(__dirname, "./users.json")
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const env = require("dotenv")
env.config();

configureDb()


const app = express()


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}
))


app.use(passport.initialize());



app.get("/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);


app.get("/auth/google/callback",
    passport.authenticate("google", { session: false }),
    async (req, res, next) => {

        try {
            let users = await fs.readFile(usersFilePath, "utf8")
            users = JSON.parse(users)

            let email = req.user.emails[0].value;

            let user = users.find((user) => {
                return user.email === email
            })
            if (!user) return res.status(404).send("User not found")

            let token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "1h" })
            res.status(200).json({ message: "Signed in successfully...", token })
        }
        catch (err) {
            next(err)
        }
    }
)

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