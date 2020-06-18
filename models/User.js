const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  favourites: {
    type: [Schema.Types.ObjectId],
    ref: 'Touristsites',
  },

  wanttogo: {
    type: [Schema.Types.ObjectId],
    ref: 'Touristsites',
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.getSignedToken = function () {
  return jwt.sign(this._id.toString(), process.env.JWT_SECRET);
};

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetPasswordExpire = Date.now() + 20 * 1000 * 60;
  return resetToken;
};

const User = mongoose.model('user', UserSchema);

module.exports = User;
