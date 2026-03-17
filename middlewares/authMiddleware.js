let authMiddleware = (req, res, next) => {  // protected route middleware
    console.log("Authorized...")
    next();
}

module.exports = {authMiddleware}