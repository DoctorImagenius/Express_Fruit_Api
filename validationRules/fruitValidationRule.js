const {body, query} = require("express-validator")

const validationBodyRules = [
    body("name").isString().withMessage("Name must be string").notEmpty().withMessage("Name requird"),
    body("price").isNumeric().withMessage("price must be number").notEmpty().withMessage("price requird"),
    body("in_season").isBoolean().withMessage("in_season must be boolean").notEmpty().withMessage("in_season requird"),
    body("color").isString().withMessage("in_season must be string").notEmpty().withMessage("color requird"),
]

const validationQueryRules = [
    query("name").optional().isString().withMessage("Name must be string"),
    query("price").optional().isNumeric().withMessage("price must be number"),
    query("in_season").optional().isBoolean().withMessage("in_season must be boolean"),
    query("color").optional().isString().withMessage("in_season must be string"),
]

module.exports = {
    validationBodyRules,
    validationQueryRules
}