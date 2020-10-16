const express = require('express');
const router = express.Router();
const { Validator } = require('node-input-validator');
const connection = require('../dbConnection/dbConection');
const { validateOrderInput, 
        prepareOrder, 
        getOrderId,
        prepareOrderItem } = require('../orders/validateOrders')

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

router.post("/create",   async (req,res) => {
    const orderDetails = req.body;

    validateOrderInput(orderDetails);
    
    const orderSql =  prepareOrder(orderDetails);
    // console.log(orderCreation);
    connection.query(orderSql, async(error, result) => {
        if(error) {
            return res.status(522).send("Order creation failed !");
        }
    })              
    
    const  orderItemsSql = (getOrderId(orderDetails.productId) ,async(err, result) => {
        console.log(result);
        connection.query(orderItemsSql, (error, result) => {
            if(error) {
                return res.status(522).send('Order Creation Failed!')
            }  
            res.status(201).send("Order created !");
                        
                   }) 
                }) ;
            })
        
//     });    
// }) 

module.exports =  router;