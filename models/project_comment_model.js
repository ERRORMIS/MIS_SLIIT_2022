import mongoose from 'mongoose'

const ProjectComment = new mongoose.Schema({
  author: {
    type: mongoose.Types.ObjectId,
    ref: "Login",
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
});

export default mongoose.model('Project_comment', ProjectComment)