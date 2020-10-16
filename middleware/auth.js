const express = require('express')
const connection = require('../dbConnection/dbConection')

const adminUser = async(req,res,next) => {

    console.log('middlewae:', req.session.role)
    if(!req.session.role){
          return res.status(422).send('Please login and continue!')
    }

    const userRole = req.session.role.toUpperCase()
    if(userRole === 'ADMIN') {
          next()
    } else {
          return res.status(422).send('Only Admin can add/update/remove products!!!')
    }
}


module.exports = adminUser;