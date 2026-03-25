
let checkUrlMiddleware = (req, res, next) => {
    console.log(req.url)
    next();
}

let checkHostMiddleware = (req, res, next) => {
    console.log(req.headers.host)
    next();
}

module.exports = {
    checkUrlMiddleware,
    checkHostMiddleware
}