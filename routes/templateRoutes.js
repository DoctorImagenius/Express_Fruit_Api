const express = require("express")
const router = express.Router()
const {getTemplateEngine, getTemplateEngineById} = require("../controllers/templateControllers")
const {authMiddleware} = require("../middlewares/authMiddleware")


router.get("/", authMiddleware, getTemplateEngine)
router.get("/:id", authMiddleware, getTemplateEngineById)


module.exports = router
