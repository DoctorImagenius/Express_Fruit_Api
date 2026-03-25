const {param } = require("express-validator")

const validationParamRules = [
    param("id").isInt().withMessage("id must be number")
]


module.exports = {
    validationParamRules
}