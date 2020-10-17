const express = require('express');
const router = express.Router();
const { Validator } = require('node-input-validator');
const connection = require('../../dbConnection/dbConection');
const {  
        prepareOrder, 
        getOrderId,
        prepareOrderItem } = require('./validateOrders')
let order_items_sql = `insert into order_items ( order_id, product_id) values (?,?) `


const validateOrderInput = (orderDetails) => { 
    // const orderDetails = req.body;
    const inputCheck = new Validator(orderDetails , {
        userId : 'required',
        paymentId : 'required',
        payerId: 'required',
        products : [{
            productid: 'required',
            productname: 'required',
            price: 'required'
        }]
      });
       
    //   const match = await inputCheck.check();
    //   console.log('tttttt:',match);    
      inputCheck.check().then((matched) => {
        if(!matched) {
            return res.status(422).send(inputCheck.errors);
        }
    }) .catch((error) => {
        console.log(error);
    })
}

/**
 * Method to place new order
 */
router.post("/create",   async (req,res) => {
    const orderDetails = req.body;
     
    let paymentTotal = 0;
     orderDetails.products.map(async (item) => {
        paymentTotal = paymentTotal + item.price
    });

    orderDetails.paymentTotal = paymentTotal;

    //  validateOrderInput(orderDetails);
    let  orderId = 0;
    const orderSql =  prepareOrder(orderDetails);
 
    connection.query(orderSql, async(error, result) => {
        if(error) {
            return res.status(522).send("Order creation failed !");
        }
        orderId =result['insertId'];

        orderDetails.products.map(async (item) => {
            connection.query(order_items_sql, [orderId,item.productid] ,(error, success) => {
                if(error){
                    console.log(error);
                    return res.status(422).send("Order Creation failed !")
                }
            });
        }) 
        res.status(201).send("Order placed Successfully !");             
    })
}) 

module.exports =  router;