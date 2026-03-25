const fs = require("fs/promises")
const path = require("path")

let filePath = path.join(__dirname, "../fruits.json")

let freshFruits = [
    { id: 1, name: "apple", price: 200, in_season: false, color: "red" },
    { id: 2, name: "banana", price: 50, in_season: false, color: "yellow" },
    { id: 3, name: "orange", price: 200, in_season: true, color: "orange" },
    { id: 4, name: "kiwi", price: 200, in_season: false, color: "green" }
];

async function configureDb () {
    try {
        await fs.access(filePath)
        console.log("Database is ready...")
    }
    catch (err) {
        await fs.writeFile(filePath, JSON.stringify(freshFruits));
        console.log("Database created...")
    }
}

module.exports = {configureDb,freshFruits}

