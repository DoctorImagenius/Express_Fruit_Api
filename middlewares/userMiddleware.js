
let checkUrlMiddleware = (req, res, next) => {
    console.log(req.url)
    next();
}

let checkHeaderMiddleware = (req, res, next) => {
    console.log(req.headers.host)
    next();
}

module.exports = {
    checkUrlMiddleware,
    checkHeaderMiddleware
}