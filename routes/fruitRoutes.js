const express = require("express")
const router = express.Router()
const { getFruit, getFruits, createFruit, restoreFruits, updateFruit, deleteFruit } = require("../controllers/fruitsControllers")
const {authMiddleware} = require("../middlewares/authMiddleware")
const {validationBodyRules, validationQueryRules} = require("../validationRules/fruitValidationRule")
const {validationMiddleware} = require("../middlewares/validationMiddleware")


router.get("/:id", getFruit)

router.get("/", validationQueryRules, validationMiddleware, getFruits)

router.post("/",validationBodyRules ,validationMiddleware, createFruit)

router.post("/restore", restoreFruits)

router.put("/:id", updateFruit)

router.delete("/:id",authMiddleware ,deleteFruit)

module.exports = router