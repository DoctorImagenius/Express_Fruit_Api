const express = require("express")
const router = express.Router()
const { getFruit, getFruits, createFruit, restoreFruits, updateFruit, deleteFruit } = require("../controllers/fruitsControllers")
const {authMiddleware} = require("../middlewares/authMiddleware")
const {validationBodyRules, validationQueryRules, validationParamRules} = require("../validationRules/fruitValidationRule")
const {validationMiddleware} = require("../middlewares/validationMiddleware")


router.get("/:id", validationParamRules, validationMiddleware, getFruit)

router.get("/", validationQueryRules, validationMiddleware, getFruits)

router.post("/",validationBodyRules ,validationMiddleware, createFruit)

router.post("/restore", restoreFruits)

router.put("/:id", validationParamRules, validationMiddleware, updateFruit)

router.delete("/:id", authMiddleware, validationParamRules, validationMiddleware, deleteFruit)

module.exports = router