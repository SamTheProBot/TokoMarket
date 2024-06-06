import mongoose, { Schema } from 'mongoose';
import { IsignupUser } from '../util/user';
import bcrypt from 'bcrypt';

const User = new mongoose.Schema<IsignupUser>({
  name: {
    type: String,
    required: [true, `please provide name`],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: [true, `please provide name`],
    match: [
      /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
      'please provide valid email',
    ],
  },
  password: {
    type: String,
    required: [true, `please provide name`],
    minlength: 3,
    maxlength: 50,
  },
});

User.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

User.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

User.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', User);
