
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

// Hash 
UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10).then((salt) => {
    bcrypt.hash(user.password, salt).then((hash) => {
      user.password = hash;  
      next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);
