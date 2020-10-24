//import
const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser');
const conn = require('../db_connect')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt');


//load dotenv config
dotenv.config();

// parse application/json
router.use(bodyParser.json());

function generateAccessToken (payload) {
    return jwt.sign({
        id: payload.id,
        fullname: payload.fullname,
        username: payload.username,
    }, process.env.access_token_secret, {expiresIn: '1800s'})
}

//login endpoint
router.post('/', (req, res) => {
    const sql = "SELECT * FROM Users WHERE username=?";
    conn.query({sql, values: [req.body.username]}, (err, results) => {
      if(err) throw err;

      const user=results[0];
      bcrypt.compare(req.body.password, user.password, function(err, result) {
        if(err) throw err;

        if(result === true) {
            const token=generateAccessToken(user);
            res.send(JSON.stringify({"status": 200, "error": null, "response": token}));
        } else {
            res.status(401).json({"status":401, "error": "Login Error"})
        }
      }) 
    });
  });

module.exports = router;