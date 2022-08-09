import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const incubatorSchema = new mongoose.Schema(
{
    company: {
        type: String,
    },
    email: {
        type: String,
    },
    contactNo: {
        type: String,
    },
    location: {
        type: String,
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

incubatorSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    })
}

export default mongoose.model('Incubator', incubatorSchema)
