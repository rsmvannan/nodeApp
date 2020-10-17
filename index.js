const express = require('express');
const bodyparser = require('body-parser');
const registration = require('./api/user/registration');
const login = require('./api/user/login');
const logout = require('./api/user/logout');
const product = require('./api/products/product');
const order = require('./api/orders/order');
const session = require('express-session')
const app = express();

app.use(session({
    secret: 'secret token'
}));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.listen(3001 , () => {
    console.log('server is running on port 3001')
})

app.use("/registration", registration);
app.use("/login" , login);
app.use("/product", product);
app.use("/order" , order);
app.use("/logout", logout);

