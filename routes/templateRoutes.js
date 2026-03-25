const express = require("express")
const router = express.Router()
const {getTemplateEngineFruit, getTemplateEngineFruits} = require("../controllers/templateController")
const {authMiddleware} = require("../middlewares/authMiddleware")
const {validationParamRules} = require("../validationRules/templateValidationRule")
const {validationMiddleware} = require("../middlewares/validationMiddleware")


router.get("/", authMiddleware, getTemplateEngineFruits)
router.get("/:id", validationParamRules, validationMiddleware, authMiddleware, getTemplateEngineFruit)


module.exports = router
