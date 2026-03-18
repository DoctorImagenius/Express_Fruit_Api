const fs = require("fs/promises")
const path = require("path")
const filePath = path.join(__dirname, "../fruits.json")
const {freshFruits} = require("../models/routeModel")


async function getFruit (req, res, next) {
    const id = Number(req.params.id);
    try {
        let fruits = await fs.readFile(filePath, "utf8")
        fruits = JSON.parse(fruits)

        let fruit = fruits.find((fruit) => {
            return fruit.id === id
        })
        if (!fruit) return res.status(404).send("Not Found")
        res.status(200).json(fruit)
    }
    catch (err) {
        next(err)
    }
}

async function getFruits (req, res, next) {

    let { name, price, in_season, color } = req.query;

    if (price) price = Number(price)

    try {
        let fruits = await fs.readFile(filePath, "utf8")
        fruits = JSON.parse(fruits)


        if (name) {
            fruits = fruits.filter((fruit) => {
                return fruit.name === name
            })
        }
        if (price) {
            fruits = fruits.filter((fruit) => {
                return fruit.price === price
            })
        }
        if (in_season) {
            in_season === "true" ? in_season = true : in_season = false;
            fruits = fruits.filter((fruit) => {
                return fruit.in_season === in_season
            })
        }
        if (color) {
            fruits = fruits.filter((fruit) => {
                return fruit.color === color
            })
        }

        res.status(200).json(fruits);
    }
    catch (err) {
        next(err)

    }
}

async function createFruit(req, res, next) {

    let newFruit = req.body;

    try {

        let fruits = await fs.readFile(filePath, "utf8")
        fruits = JSON.parse(fruits)
        newFruit.id = fruits.length === 0 ? 1 : Math.max(...fruits.map((fruit) => fruit.id)) + 1;
        fruits.push(newFruit);
        await fs.writeFile(filePath, JSON.stringify(fruits))
        res.status(201).json(newFruit)
    }
    catch (err) {
        next(err)

    }
}

async function restoreFruits(req, res, next) {

    try {
        await fs.writeFile(filePath, JSON.stringify(freshFruits));
        res.status(201).send("Fruits restored successfully...")
    }
    catch (err) {
        next(err)

    }


}

async function updateFruit(req, res, next) {

    const id = Number(req.params.id);

    let updatedFruit = req.body;
    updatedFruit.id = id;

    try {

        let fruits = await fs.readFile(filePath, "utf8")
        fruits = JSON.parse(fruits)

        let fruit = fruits.find((fruit) => {
            return fruit.id === id
        })
        if (!fruit) return res.status(404).send("Not Found")
        let updatedFruits = fruits.map((fruit) => {
            return fruit.id === id ? updatedFruit : fruit;
        })
        await fs.writeFile(filePath, JSON.stringify(updatedFruits))
        res.status(200).json(updatedFruit)
    }
    catch (err) {
        next(err)
    }
}

async function deleteFruit(req, res, next) {

    const id = Number(req.params.id);

    try {
        let fruits = await fs.readFile(filePath, "utf8")
        fruits = JSON.parse(fruits)

        let fruit = fruits.find((fruit) => {
            return fruit.id === id
        })
        if (!fruit) return res.status(404).send("Not Found")
        let filteredFruits = fruits.filter((fruit) => {
            return fruit.id !== id;
        })
        await fs.writeFile(filePath, JSON.stringify(filteredFruits))
        res.status(200).send("Deleted successfully...")

    }
    catch (err) {
        next(err)
    }
}



module.exports = {
    getFruit,
    getFruits,
    createFruit,
    restoreFruits,
    updateFruit,
    deleteFruit
}