const fs = require("fs/promises")
const path = require("path")
const filePath = path.join(__dirname, "../fruits.json")


async function getTemplateEngineFruits(req, res, next) {
    
    try {
        let fruits = await fs.readFile(filePath, "utf8")
        fruits = JSON.parse(fruits)
        res.render("template", {fruits : fruits})
    }
    catch (err) {
        next(err)
    }
}

async function getTemplateEngineFruit(req, res, next) {
    const id = Number(req.params.id);
    try {
        let fruits = await fs.readFile(filePath, "utf8")
        fruits = JSON.parse(fruits)
        let fruit = fruits.find((fruit) => {
            return fruit.id === id
        })
        if (!fruit) return res.status(404).render("notFound")
        res.render("template", {fruits : [fruit]})
    }
    catch (err) {
        next(err)
    }
}


module.exports = {getTemplateEngineFruits, getTemplateEngineFruit}