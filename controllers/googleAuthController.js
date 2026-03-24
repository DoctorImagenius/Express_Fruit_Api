const fs = require("fs/promises")
const path = require("path")
const usersFilePath = path.join(__dirname, "../users.json")
const jwt = require("jsonwebtoken")
require("dotenv").config();


let googleSignin =  async (req, res, next) => {

        try {
            let users = await fs.readFile(usersFilePath, "utf8")
            users = JSON.parse(users)

            let email = req.user.emails[0].value;

            let user = users.find((user) => {
                return user.email === email
            })
            if (!user) {
                let newUser = {
                    email,
                    provider: "google"
                }
                users.push(newUser)
                await fs.writeFile(usersFilePath, JSON.stringify(users))
            }

            let token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "1h" })
            res.status(200).json({ message: "Signed in successfully...", token })
        }
        catch (err) {
            next(err)
        }
    }

module.exports = {googleSignin}