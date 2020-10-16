const mysql =  require('mysql')

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'pass@word1',
    port:3306,
    database:'bankingapp'

})

//use conenction object to connect to database
connection.connect(function(error){
    if(error){
        throw error
    }
    console.log("Connected to database - bankingapp");
})

module.exports = connection;

