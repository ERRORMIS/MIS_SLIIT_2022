import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema(
  {
    owner: {
      type: String,
      required: [true, 'Please provide owner'],
      maxlength: 50,
    },
    title: {
      type: String,
      required: [true, 'Please provide title'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['ongoing', 'declined', 'pending'],
      default: 'pending',
    },
    // jobType: {
    //   type: String,
    //   enum: ['full-time', 'part-time', 'remote', 'internship'],
    //    default: 'full-time',
    // },
    description: {
      type: String,
      default: 'my city',
      required: true,
    },
    requirement: {
      type: String,
      default: ''
    },
    startDate: {
      type: String
    },
    endDate: {
      type: String
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

export default mongoose.model('Job', JobSchema)
