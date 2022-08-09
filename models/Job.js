import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    owner: {
      type: String,
      required: [true, "Please provide owner"],
      maxlength: 50,
    },
    title: {
      type: String,
      required: [true, "Please provide title"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["ongoing", "declined", "pending"],
      default: "pending",
    },
    // jobType: {
    //   type: String,
    //   enum: ['full-time', 'part-time', 'remote', 'internship'],
    //    default: 'full-time',
    // },
    description: {
      type: String,
      default: "my city",
      required: true,
    },
    requirement: {
      type: [
        {
          value: String,
          label: String,
        },
      ],
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    comments: {
      type: [mongoose.Types.ObjectId],
      ref: "Project_comment",
    },
    teamMembers: {
      type: {
        studentList: [mongoose.Types.ObjectId],
        alumniList: [mongoose.Types.ObjectId],
        staffList: [mongoose.Types.ObjectId],
      },
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
