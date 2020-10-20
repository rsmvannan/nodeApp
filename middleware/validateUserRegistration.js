const { Validator } = require('node-input-validator');

const inputValidator =  async (req,res,next) => {
    console.log('middle ware:', req.body);
    const userDetails = req.body;
    const inputCheck = new Validator(userDetails , {
        first_name : 'required',
        last_name : 'required',
        email: 'required|email',
        password:'required',
        role: 'required'
      });

      inputCheck.check().then((matched) => {
           
            if(!matched) {
                return res.status(422).send(inputCheck.errors);
            } 
            next();         
      });

      
}

module.exports = inputValidator;
