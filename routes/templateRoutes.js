const express = require("express")
const router = express.Router()
const {getTemplateEngine, getTemplateEngineById} = require("../controllers/templateControllers")


router.get("/", getTemplateEngine)
router.get("/:id", getTemplateEngineById)


module.exports = router
