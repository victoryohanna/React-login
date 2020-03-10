const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const secret = "secretKey";
const router = express.Router();

const User = require("../models/user.model");

router.post("/register", (req, res) => {
    let today = new Date();
  let requestBody = {
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      email : req.body.email,
      password : req.body.password,
      dateCreated : today
  };
  User.findOne({ email: requestBody.email }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data) {
        res.status(401).send("Email already registerred");
      } else {
        let user = new User(requestBody);
        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(user.password, salt, (err, hash)=>{
                if(err) throw err;
                user.password = hash;
                user.saltSecret = salt;
                user.save(res, (err, data) => {
                    if (err) {
                      console.log(err);
                    } else {
                      let payload = { subject: data };
                      let token = jwt.sign(payload, secret);
                      res.status(200).send({ token });
                    }
                });
            });
        });
      }
    }
  });
});

//Login User
router.post("/login", (req, res) => {
  let requestBody = req.body; 
  User.findOne({ email: requestBody.email},(err, data) => {
      //console.log(data)
      if(data){
        if(bcrypt.compareSync(req.body.password, data.password)){
            let payload = { subject: data };
            let token = jwt.sign(payload, secret, {
                expiresIn : 1440
            });
            res.status(200).send({ token });
        }
      } else {
          res.status(401).send("Invalid Email or password");
        }
    });
});
//Retreive all users

// router.get('/list', (req, res)=>{
//     User.find((err, data)=>{
//         if(!err){
//             res.status(200).send(data);
//         }else{
//             res.status(400).send('Record not found ' + JSON.stringify(err, undefined, 2));
//         }
//     })
// })

// // Retreive users by id
// router.get('/:id', (req, res)=>{
//     let id = req.params.id;
//     User.findById(id, (err, data)=>{
//         if(err){
//             res.status(400).send('Error occured ' + JSON.stringify(err, undefined, 2));
//         }else if(!data){
//             res.status(401).send('Data not found ');
//         }else{
//             res.status(200).send(data);
//         }
//     })
// })

module.exports = router;
