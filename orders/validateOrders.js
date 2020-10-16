const validateOrderInput = () => {
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
          }
        })
      
}

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

const getOrderId = async(productId) => {
    const orderId  = ` select max(id) as orderId from orders`;
    connection.query(orderId, (error,result) => {
       if(error){
           return res.status(544).send("Order itemd failed !")
       } else {
           console.log(result[0].orderId);
           const orderItemsSql = prepareOrderItem(result[0].orderId,productId);
           return orderItemsSql;
       }
    })
}

const prepareOrderItem = async(orderId,productId) => {
    const orderItemSQL = ` insert into order_items (
                             product_id ,
                             order_id,
                             created_at) 
                            values (
                             ${productId},
                             ${orderId},
                             CURRENT_TIMESTAMP
                            ) `
                            console.log(orderItemSQL);
     return orderItemSQL;
}

module.exports = { validateOrderInput, prepareOrder, getOrderId,prepareOrderItem};