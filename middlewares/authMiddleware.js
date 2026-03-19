const jwt = require("jsonwebtoken");
require("dotenv").config();

let secretKey = process.env.SECRET_KEY

let authMiddleware = (req, res, next) => { 

    let full_token = req.headers.authorization;
    if (!full_token) return res.status(401).send("No token provided")

    try {
        let token = full_token.split(" ")[1];
        let decoded = jwt.verify(token, secretKey);
        if (!decoded) return res.status(401).send("Invalid token")
        req.user = decoded
    }
    catch (err) {
        return res.status(401).send("Invalid token")
    }
    next();
}

module.exports = {authMiddleware}