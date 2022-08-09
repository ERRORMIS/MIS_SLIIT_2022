import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const AlumniSchema = new mongoose.Schema(
{
    name: {
        type: String,
    },
    lastName: {
        type: String,
        default: ''
    },
    nic: {
        type: String,
        default: ''
    },
    email: {
        type: String,
    },
    gender: {
        type: String,
        default: ''
    },
    contactNo: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    jobTitle: {
        type: String,
        default: ''
    },
    company: {
        type: String,
        default: ''
    },
    graduatedYear: {
        type: String,
        default: ''
    },
    img: {
        type: String,
        default: ''
    },
    // createdBy: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'User',
    //     required: [true, 'Please provide user'],
    //},
},
    { timestamps: true }
)

AlumniSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    })
}

export default mongoose.model('Alumni', AlumniSchema)
