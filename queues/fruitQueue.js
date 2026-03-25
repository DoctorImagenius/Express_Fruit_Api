const Queue = require("bull");

const fruitQueue = new Queue("fruitsQueue", {
    redis: {
        host: "localhost",
        port: 6379,
    },
});

module.exports = {fruitQueue}