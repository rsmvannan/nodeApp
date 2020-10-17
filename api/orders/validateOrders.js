const express = require('express')
const { Validator } = require('node-input-validator');

// const validateOrderInput = async (req,res,next) => { 
//     const orderDetails = req.body;
//     const inputCheck = new Validator(orderDetails , {
//         userId : 'required',
//         paymentId : 'required',
//         payerId: 'required',
//         products : [{
//             productid: 'required',
//             productname: 'required',
//             price: 'required'
//         }]
//       });
       

//     //   inputCheck.check().catch( () => {
//     //     return res.status(422).send(inputCheck.errors);
//     //   })

      
//       inputCheck.check().then((matched) => {    
       
//         if(!matched) {
//               return res.status(422).send(inputCheck.errors);
//           } 
//           next();
//         })
        
      
// }

const prepareOrder = (orderDetails) => {
    const placeOrder = ` insert into orders
                       (user_id, 
                        payment_id,
                        payer_id,
                        payment_total,
                        created_at) 
                   values (
                        ${orderDetails.userId},
                       '${orderDetails.paymentId}',
                       '${orderDetails.payerId}',
                        ${orderDetails.paymentTotal},
                        CURRENT_TIMESTAMP)`
   
        return placeOrder;
}

module.exports = {  prepareOrder};