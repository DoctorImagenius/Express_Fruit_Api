const fs = require("fs/promises")
const path = require("path")
const usersFilePath = path.join(__dirname, "../users.json")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const secretKey = "secret"


async function signup(req, res, next) {
    try {
        let users = await fs.readFile(usersFilePath, "utf8")
        users = JSON.parse(users)
        let {email, password} = req.body;
        let hash = await bcrypt.hash(password, 10)
        let user = {email, password: hash}

        let alreadyExist = users.find((user) => {
            return user.email === email
        })
        if (alreadyExist) return res.status(400).send("User already exist")
        users.push(user)
        await fs.writeFile(usersFilePath, JSON.stringify(users))
        res.json({ user, message: "Signed up successfully..." })
    }
    catch (err) {
        next(err)
    }
}

async function signin(req, res, next) {
    try {
        let users = await fs.readFile(usersFilePath, "utf8")
        users = JSON.parse(users)
        let {email, password} = req.body;
        let user = users.find((user) => {
            return user.email === email
        })
        if (!user) return res.status(404).send("Not Found")
        let isValid = await bcrypt.compare(password, user.password)
        if (!isValid) return res.status(404).send("Not Found")

        let token = jwt.sign({email}, secretKey, {expiresIn: "1h"})
        res.status(200).json({message: "Signed in successfully...", token})
    }
    catch (err) {
        next(err)
    }
}


module.exports = { signup, signin }