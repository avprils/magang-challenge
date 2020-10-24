const jwt=require('jsonwebtoken');
const dotenv = require('dotenv');

//load dotenv config
dotenv.config();

function authenticateToken (req, res, next) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ') [1]
    console.log(process.env.access_token_secret);
    if (token == null) return res.status(401).json({"status": 401, "error": "Unauthorized"})

    jwt.verify(token, process.env.access_token_secret, (err, user) => {
        if (err) return res.status(403).json({"status": 403, "error": "Token is Expired or Wrong Token"})

        req.user=user;
        next();
    })
}

module.exports = {authenticateToken};