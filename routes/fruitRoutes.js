const express = require("express")
const router = express.Router()
const { getFruit, getFruits, createFruit, restoreFruits, updateFruit, deleteFruit } = require("../controllers/fruitsControllers")
const {authMiddleware} = require("../middlewares/authMiddleware")


router.get("/:id", getFruit)

router.get("/", getFruits)

router.post("/", createFruit)

router.post("/restore", restoreFruits)

router.put("/:id", updateFruit)

router.delete("/:id",authMiddleware ,deleteFruit)

module.exports = router