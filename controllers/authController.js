const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');

exports.signup = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then((existingUser) => {
    if (existingUser) {
      return res.status(400).send('User already exists.');
    }

    
    const newUser = new User({ email, password });

   
    newUser.save().then(() => {

      const token=jwt.sign({id: newUser._id}, 'your_jwt_secret', {expiresIn:'1hr'});

      res.status(201).json({message:'User created successfully.',token});
    });
  });
};


exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).send('Invalid email or password.');
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).send('Invalid email or password.');
      }

      const token=jwt.sign({id:user._id},'your_jwt_secret',{expiresIn:'1hr'});

      res.json({message:'Login successful.',token});
    });
  });
};
