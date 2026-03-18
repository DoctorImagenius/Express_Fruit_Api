const Queue = require("bull")
const {fruitsQueue} = require("../queues/fruitsQueues")

fruitsQueue.process("fruits",async (job) => {

    console.log("backgroung job on fresh fruits has been done... ")
    job.data.fruits.forEach(fruit => {
        console.log(fruit.name)
    });
})

fruitsQueue.on("completed", (job) => {
    console.log("Job completed...")
})

fruitsQueue.on("failed", (job) => {
    console.log("Job failed...")
})




module.exports = {fruitsQueue}