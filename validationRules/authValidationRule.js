const { body} = require("express-validator")


const validationAuthRules = [
    body("email").isEmail().withMessage("email must be email").notEmpty().withMessage("email requird"),
    body("password").isString().withMessage("password must be string").notEmpty().withMessage("password requird").isLength({min : 8}).withMessage("password must be at least 8 characters"),
]

module.exports = {
    validationAuthRules
}