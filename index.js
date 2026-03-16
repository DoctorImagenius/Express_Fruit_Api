const express = require("express")
const fs = require("fs/promises")
const path = require("path")
const {getFruit, getFruits, createFruit, restoreFruits, updateFruit, deleteFruit} = require("./controllers/fruitsControllers")


let filePath = path.join(__dirname, "fruits.json")

let freshFruits = [
    { id: 1, name: "apple", price: 200, in_season: false, color: "red" },
    { id: 2, name: "banana", price: 50, in_season: false, color: "yellow" },
    { id: 3, name: "orange", price: 200, in_season: true, color: "orange" },
    { id: 4, name: "kiwi", price: 200, in_season: false, color: "green" }
];

(async function () {
    try {
        await fs.access(filePath)
    }
    catch (err) {

        await fs.writeFile(filePath, JSON.stringify(freshFruits));
        console.log("File created...")
    }
})()

const app = express()

let checkUrlMiddleware = (req, res, next) => {
    console.log(req.url)
    next();
}

let checkHeaderMiddleware = (req, res, next) => {
    console.log(req.headers.host)
    next();
}

let authMiddleware = (req, res, next) => {  // protected route middleware
    console.log("Authorized...")
    next();
}

app.use(express.json()) // application middleware
app.use(checkUrlMiddleware) // custom middleware
app.use(checkHeaderMiddleware) // custom middleware


app.get("/fruits/:id", getFruit)

app.get("/fruits", getFruits)

app.post("/fruits", createFruit)

app.post("/restore", restoreFruits)

app.put("/fruits/:id", updateFruit)

app.delete("/fruits/:id", authMiddleware, deleteFruit)

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message })
})

app.listen(3000, () => {
    console.log("App is running...")
})