const Queue = require("bull")
const {fruitQueue} = require("../queues/fruitQueue")

fruitQueue.process("fruits",async (job) => {

    console.log("Job processing...")
    job.data.fruits.forEach(fruit => {
        console.log(fruit.name)
    });
})

fruitQueue.on("completed", (job) => {
    console.log("Job completed...")
})

fruitQueue.on("failed", (job) => {
    console.log("Job failed...")
})



module.exports = {fruitQueue}