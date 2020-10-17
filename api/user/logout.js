const express = require('express')
const router= express.Router()


/**
 * Method for user logout 
 */

router.post("/", (req,res) => {
    if(req.session.user && req.session.role) {
        req.session.user = '';
        req.session.role  = '';
        return res.status(200).send("Logout Successful !")
    } else {
        return res.status(422).send("User should login before logout !")
    } 
      
 
})

module.exports = router