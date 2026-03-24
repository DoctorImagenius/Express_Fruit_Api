const express = require("express")
const router = express.Router()
const {signup, signin} = require("../controllers/authControllers")
const {validationAuthRules} = require("../validationRules/authValidationRule")
const {validationMiddleware} = require("../middlewares/validationMiddleware")
const {rateLimitMiddleware} = require("../middlewares/rateLimitMiddleware")
const {googleSignin} = require("../controllers/googleAuthController")
const {passport} = require("../config/config")


router.post("/signup", validationAuthRules, validationMiddleware, signup)
router.post("/signin", rateLimitMiddleware, signin)
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { session: false }),googleSignin)


module.exports = router