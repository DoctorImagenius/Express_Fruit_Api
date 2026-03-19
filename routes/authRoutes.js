const express = require("express")
const router = express.Router()
const {signup, signin} = require("../controllers/authControllers")
const {validationAuthRules} = require("../validationRules/authValidationRule")
const {validationMiddleware} = require("../middlewares/validationMiddleware")


router.post("/signup", validationAuthRules, validationMiddleware, signup)
router.post("/signin", signin)


module.exports = router