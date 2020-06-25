const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/error-response');
const User = require('../models/User');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

//Description:    Register user
//route:          POST/api/v1/auth/register
//access:         public
exports.register = asyncHandler(async function (req, res, next) {
  const { email, password, phone, name, role } = req.body;

  const userFromDB = await User.findOne({ email: email });
  let createdUser;

  if (userFromDB) {
    return next(
      new ErrorResponse(`Account with email ${email} already exist`, 409)
    );
  }
  createdUser = await User.create({ email, password, phone, name, role });

  res.status(200).json({
    success: true,
    data: createdUser,
  });
});

//Description:    Login user
//route:          POST/api/v1/auth/register
//access:         public
exports.login = asyncHandler(async function (req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse('Provide email and password', 400));
  }

  const user = await User.findOne({ email: email }).select('+password');
  if (!user) {
    return next(new ErrorResponse('Invalid credentionals', 401));
  }
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const token = user.getSignedToken();
  res.status(200).json({ success: true, token, data: user });
});

//Description:    Get logged in user
//route:          GET /api/v1/auth/register
//access:         private
exports.getMe = asyncHandler(async function (req, res, next) {
  const user = await (await User.findById(req.user.id)).populated({
    path: 'orders',
    populalte: {
      path: 'issues',
    },
  });
  res.status(200).json({ success: true, data: user, token: req.token });
});

//Description:    Verify user
//route:          PUT/api/v1/auth/register
//access:         public
exports.verifyUser = asyncHandler(async function (req, res, next) {
  const verifyToken = crypto
    .createHash('sha256')
    .update(req.params.verifyToken)
    .digest('hex');

  let user = await User.findOne({
    verifyUserToken: verifytoken,
    verifyUserExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorResponse('Token expired.Request new token', 401));
  }
  user.verified = true;
  user.verifyUserExpire = undefined;
  verifyUserToken = undefined;
  user.save();

  user = await User.findById(user._id);

  res.status(200).json({ success: true, message: 'User Verified' });
});

//Description:    Forgot password
//route:          POST/api/v1/auth/register
//access:         public
exports.forgotPassword = asyncHandler(async function (req, res, next) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ErrorResponse(`No account associated with email ${req.body.email}`)
    );
  }
  const resetToken = user.generatePasswordResetToken();
  user.save();

  const message = `Reset your email using this url ${req.protocol}://${req.hostname}/api/v1/auth/reset-password/${resetToken}`;
  const options = {
    email: req.body.email,
    message: message,
    subject: 'Password Reset',
  };
  try {
    await sendEmail(options);
    res.status(200).json({ success: true, message: 'Email sent' });
  } catch (e) {
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    user.save();
    return next(new ErrorResponse('Could not send email,500'));
  }
});
//Description:    Reset password
//route:          PUT/api/v1/auth/register
//access:         private
exports.resetPassword = asyncHandler(async function (req, res, next) {
  const resentToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  const { password } = req.body;
  const user = await User.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse('Token expired', 401));
  }
  if (!password) {
    return next(new ErrorResponse('Provide password', 401));
  }

  user.password = password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;
  user.save();

  const token = user.getSignedToken();
  res.status(200).json({ success: true, token: token });
});
//Description:    Change password
//route:          PUT/api/v1/auth/change-password
//access:         public
exports.changePassword = asyncHandler(async function (req, res, next) {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id).select('+password');

  if (!user) {
    return next(
      new ErrorResponse(`No user associated with id ${req.user.id}`, 404)
    );
  }

  const isMatch = await user.matchPassword(currentPassword);
  if (!Match) {
    return next(new ErrorResponse(`Inavlid creditials`, 401));
  }

  user.password = newPassword;
  user.save();

  res.status(200).json({ success: true, message: 'Password changed' });
});
