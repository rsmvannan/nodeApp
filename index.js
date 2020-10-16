const express = require('express');
const bodyparser = require('body-parser');
const mySql =  require("mysql");
const registration = require('./api/registration');
// const registration = require('./api/registertest');
const login = require('./api/login');
const product = require('./api/product');
// const order = require('./orders/order');
const order = require('./api/ortest');
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

