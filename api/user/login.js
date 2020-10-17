const express = require('express')
const router= express.Router()
const bcrypt = require('bcrypt')
const session = require('express-session')
const connection = require('../../dbConnection/dbConection')

/**
 * Method for user login 
 */

router.post("/", (req,res) => {
  const loginDetails = req.body

  const getUser = `select email, password, role from user where email = '${loginDetails.username}'`

    connection.query(getUser, async (error, result) => {

        if(error) {
            return res.status(522).send(error)
        } 
            const  isMatch =  await bcrypt.compare(loginDetails.password, result[0].password)
            
            if(isMatch){
                req.session.user = loginDetails.username;
                req.session.role  = result[0].role;
                return res.status(200).send("Login Successful !!!")
            } else {
                return res.status(401).send('Invalid Credentials !!!')
            }   
    })
})

module.exports = router