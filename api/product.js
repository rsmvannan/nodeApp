const express = require('express');
const router = express.Router();
const { Validator } = require('node-input-validator');
const adminUser =  require('../middleware/auth')
const connection = require('../dbConnection/dbConection');

const validateInput = (productDetails) =>{
    const inputCheck = new Validator(productDetails , {
        name : 'required',
        description : 'required',
        price: 'required',
        currency: 'required'
      });

      inputCheck.check().then((matched) => {
        if(!matched) {
            return res.status(422).send(inputCheck.errors);
        }
    }) 
       
}

router.post("/add", adminUser, async (req,res) => {
    const productDetails = req.body;

    validateInput(productDetails);

    const addProducts = ` insert into products(name, description, price, currency) 
            values ('${productDetails.name}',
                     '${productDetails.description}',
                     ${productDetails.price},
                     '${productDetails.currency}')`
        
    connection.query(addProducts, (error, result) => {
        if(error) {
            return res.status(522).send("Product addition failed !");
        }        
        res.status(201).send("Product added Successfully !");
    })  
}) 


router.put("/update/:id", adminUser, (req,res) => {
    const productDetails = req.body;

    const updateProducts = ` update  products set 
                        name = '${productDetails.name}',
                        description = '${productDetails.description}', 
                        price = ${productDetails.price},
                        currency = '${productDetails.currency}' 
                    where id =${req.params.id} `
    connection.query(updateProducts, (error, result) => {
        if(error) {
            return res.status(522).send("Product update failed !");
        }
        res.status(200).send("Product update Successfully !");
    })
})

router.delete("/delete/:id", adminUser, (req,res) => {
    const deleteProduct = ` delete from products where id = ${req.params.id}`;

    connection.query(deleteProduct, (error, result) => {
        if(error) {
            return res.status(522).send("Product deletion failed !"); 
        } 

        res.status(200).send("Product deleted !");
    })
})

module.exports =  router;