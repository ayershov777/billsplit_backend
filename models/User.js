const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const notificationSchema = new mongoose.Schema({
  source: String,
  details: String
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  notifications: [notificationSchema],
  groups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  }]
});

userSchema.pre('save', function(next) {
  if(!this.isModified('password')) return next();
  bcrypt.hash(this.password, 6, (err, hash) => {
    if(err) return next(err);
    this.password = hash;
    next();
  })
});

userSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.methods.comparePassword = async function(password) {
  return await new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, function(err, same) {
        if(err) reject(err);
        resolve(same);
    });
  });
};

module.exports = mongoose.model('User', userSchema);
