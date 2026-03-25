const express = require("express")
const router = express.Router()
const {getTemplateEngine, getTemplateEngineById} = require("../controllers/templateControllers")
const {authMiddleware} = require("../middlewares/authMiddleware")
const {validationParamRules} = require("../validationRules/templateValidationRule")
const {validationMiddleware} = require("../middlewares/validationMiddleware")


router.get("/", authMiddleware, getTemplateEngine)
router.get("/:id", validationParamRules, validationMiddleware, authMiddleware, getTemplateEngineById)


module.exports = router
