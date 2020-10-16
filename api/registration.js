const express = require('express');
const router = express.Router();
const { Validator } = require('node-input-validator');
const inputValidator = require('../middleware/validateUserRegistration');
const bcrypt = require('bcrypt');
const connection = require('../dbConnection/dbConection');

 
router.post("/", inputValidator, (req,res) => {
    const userDetails = req.body;
   
    const saltRound = 10;
    const password = userDetails.password;

    bcrypt.hash(password,saltRound, (err,hash) => {
        const hashPwd = hash;

        const addUser =  ` insert into user 
    ( first_name,
        last_name,
        email,
        password,
        role) 
        values (
            '${userDetails.first_name}',
            '${userDetails.last_name}',
            '${userDetails.email}',
            '${hashPwd}',
            '${userDetails.role}')`
            
    connection.query(addUser, (error,result) => {
        if(error) {
            return res.status(522).send(error.sqlMessage)
        } 
        console.log(hashPwd);
        res.status(201).send("User Registration Successful !!!")
    })

    })    
})

module.exports = router;