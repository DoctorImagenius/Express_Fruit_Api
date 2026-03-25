const express = require("express")
const router = express.Router()
const {signup, signin} = require("../controllers/authController")
const {googleSignin} = require("../controllers/googleAuthController")
const {validationAuthRules} = require("../validationRules/authValidationRule")
const {validationMiddleware} = require("../middlewares/validationMiddleware")
const {rateLimitMiddleware} = require("../middlewares/rateLimitMiddleware")
const {passport} = require("../config/passportConfig")


router.post("/signup", validationAuthRules, validationMiddleware, signup)
router.post("/signin", rateLimitMiddleware, signin)
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { session: false }), googleSignin)


module.exports = router