const Queue = require("bull");

const fruitsQueue = new Queue("fruitsQueue", {
    redis: {
        host: "localhost",
        port: 6379,
    },
});

module.exports = {fruitsQueue}