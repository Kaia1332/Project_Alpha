const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

async function register(req, res) {
    try {
      const data = req.body;
      console.log('1. data req.body hit:', data); //1
      // Generate a salt with a specific cost
      const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
  
      // // Hash the password
      data["password"] = await bcrypt.hash(data.password, salt);
      
      console.log('2. password hashed', data) //2
      // Create new email person
      const result = await User.create(data);
      
      console.log("3. register result", result); //3

      res.status(201).send(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
}


async function login(req, res) {
    const data = req.body;

    try {
      const account = await User.getOneByEmail(data.email);

      if(!account) { throw new Error('No account with this email') }
      const match = await bcrypt.compare(data.password, account.password);
  
      if (match) {
        const payload = { user_id: account.user_id, email: account.email }
        const sendToken = (err, token) => {
            if(err){ throw new Error('Error in token generation') }
            res.status(200).json({
                success: true,
                token: token,
                user_id: account.user_id,
                email: account.email
            });
        }

        jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: 3600 }, sendToken);

      } else {
        throw new Error('User could not be authenticated')  
      }
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
}

module.exports = {
    register, login
}  