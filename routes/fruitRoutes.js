const express = require("express")
const router = express.Router()
const { getFruit, getFruits, createFruit, restoreFruits, updateFruit, deleteFruit } = require("../controllers/fruitsControllers")
const {authMiddleware} = require("../middlewares/authMiddleware")
const {validationBodyRules, validationQueryRules, validationParamRules, validationMixRules } = require("../validationRules/fruitValidationRule")
const {validationMiddleware} = require("../middlewares/validationMiddleware")


router.get("/:id", validationParamRules, validationMiddleware, authMiddleware, getFruit)

router.get("/", validationQueryRules, validationMiddleware, authMiddleware, getFruits)

router.post("/",validationBodyRules ,validationMiddleware, authMiddleware, createFruit)

router.post("/restore", authMiddleware, restoreFruits)

router.put("/:id", validationMixRules, validationMiddleware, authMiddleware, updateFruit)

router.delete("/:id", authMiddleware, validationParamRules, validationMiddleware, authMiddleware, deleteFruit)

module.exports = router