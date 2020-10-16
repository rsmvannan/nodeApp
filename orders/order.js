const express = require('express');
const router = express.Router();
const { Validator } = require('node-input-validator');
const connection = require('../dbConnection/dbConection');
const validateOrders = require('./validateOrders')

// const placeOrder = (orderDetails) => {
//      const placeOrder = ` insert into orders
//                         (user_id, 
//                          payment_id,
//                          payer_id,
//                          payment_total,
//                          created_at) 
//                     values (
//                          ${orderDetails.userId},
//                         '${orderDetails.paymentId}',
//                         '${orderDetails.payerId}',
//                          ${orderDetails.paymentTotal},
//                          CURRENT_TIMESTAMP)`
    
//          return placeOrder;
// }

// const createOrderItems = (productId) => {
//       const orderId  = ` select max(id) as orderId from orders`;
//       connection.query(orderId, (error,result) => {
//          if(error){
//              return res.status(544).send("Order itemd failed !")
//          } else {
//              console.log(result[0].orderId);
//              const orderItems = prepareOrderItem(result[0].orderId,productId);
//              return orderItems;
//          }
//       })
// }

// const prepareOrderItem = (orderId,productId) => {
//        const orderItemSQL = ` insert into order_items (
//                                 product_id ,
//                                 order_id,
//                                 created_at) 
//                                values (
//                                 ${productId},
//                                 ${orderId},
//                                 CURRENT_TIMESTAMP
//                                ) `
//                                console.log(orderItemSQL);
//         return orderItemSQL;
// }

router.post("/create",   (req,res) => {
    const orderDetails = req.body;

    validateOrderInput(orderDetails)

    const inputCheck = new Validator(orderDetails , {
      userId : 'required',
      paymentId : 'required',
      payerId: 'required',
      paymentTotal: 'required',
      productId: 'required'
    });
     
    inputCheck.check().then((matched) => {
        if(!matched) {
            return res.status(422).send(inputCheck.errors);
        }  else {
            const orderCreation =  placeOrder(orderDetails);
            console.log(orderCreation);
              connection.query(orderCreation, (error, result) => {
                if(error) {
                    return res.status(522).send("Order creation failed !");
                }                 
                const  orderItems = (createOrderItems(orderDetails.productId) , (err, result) => {
                   console.log(result);
                   connection.query(result, (error, result) => {
                       if(error) {
                           return res.status(522).send('Order Creation Failed!')
                       } else {
                        res.status(201).send("Order created !");
                       }
                   }) 
                }) ;
            })
        }
    });    
}) 

module.exports =  router;