import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const LoginSchema = new mongoose.Schema({
    userID: {
      type: mongoose.Types.ObjectId,
    },
    type: {
        type: String,
        required: [true, 'Please provide type'],
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
        select: false,
    },
},{ timestamps: true }
)

LoginSchema.pre('save', async function () {
  // console.log(this.modifiedPaths())
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

LoginSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
}

LoginSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

export default mongoose.model('Login', LoginSchema)
