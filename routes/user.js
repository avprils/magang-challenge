//import
const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser');
const conn = require('../db_connect')
const authMidldleware = require ('../middleware/bearer_token')
const bcrypt = require ('bcrypt');


// parse application/json
router.use(bodyParser.json());
router.use(authMidldleware.authenticateToken);

//show list user
router.get('/', (req, res) => {
    const sql = "SELECT * FROM Users";
    const query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });
   
//show list user with id
router.get('/user/:id',(req, res) => {
    const sql = "SELECT * FROM Users WHERE id="+req.params.id;
    const query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  
//create new user
router.post('/',(req, res) => {
    const plainPassword=req.body.password
    console.log(plainPassword);
    bcrypt.hash(plainPassword, 10, function(err, hash) {
      console.log(hash);
      if(err) throw err;

        const data = { 
          id: req.body.id, 
          fullname:req.body.fullname, 
          username: req.body.username, 
          password: hash
        };
      const sql = "INSERT INTO Users SET ?";
      const query = conn.query(sql, data,(err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        console.log(req.body.fullname)
      });
    });
  });
   
//update user
router.put('/user/:id',(req, res) => {
    const sql = "UPDATE Users SET fullname='"+req.body.fullname+"', username='"+req.body.username+"',password='"+req.body.password+"' WHERE id="+req.params.id;
    const query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    console.log(req.body.fullname)
    });
  });
   
//Delete data user berdasarkan id
router.delete('/user/:id',(req, res) => {
    let sql = "DELETE FROM Users WHERE id="+req.params.id+"";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });
  
 
module.exports = router;