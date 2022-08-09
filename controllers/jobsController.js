import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment";
import login_model from "../models/login_model.js";
import ProjectComment from "../models/project_comment_model.js";

const createJob = async (req, res) => {
  const { title, owner, description } = req.body;

  var bb = description.replace(/&lt;/g, "<");
  req.body.description = bb;

  if (!title || !owner) {
    throw new BadRequestError("Please provide all values");
  }
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const getAllJobs = async (req, res) => {
  const { status, jobType, sort, search, requirement } = req.query;


  let queryObject = {
    // createdBy: req.user.userId,
  };
  // add stuff based on condition

  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }
  if (search) {
    queryObject.title = { $regex: search, $options: "i" };
  }

  if (requirement && requirement !== 'all') {
    queryObject = { ...queryObject, "requirement.value": requirement}
  }

  // NO AWAIT

  let result = Job.find(queryObject).populate({
    path: "comments",
    populate: {
      path: "author",
      populate: {
        path: "userID",
      },
    },
  });

  // chain sort conditions

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("title");
  }
  if (sort === "z-a") {
    result = result.sort("-title");
  }

  //

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const jobs = await result;

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
};

const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { owner, title } = req.body;

  if (!title || !owner) {
    throw new BadRequestError("Please provide all values");
  }
  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id :${jobId}`);
  }
  // check permissions

  checkPermissions(req.user, job.createdBy);

  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedJob });
};

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id :${jobId}`);
  }

  checkPermissions(req.user, job.createdBy);

  await job.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Job removed" });
};

const showStats = async (req, res) => {
  // console.log(req);
  // console.log(req.user.userId);

  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    ongoing: stats.ongoing || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

const addProjectComment = async (req, res) => {
  const projectId = req.params.projectId;

  try {
    const job = await Job.findOne({ _id: projectId });

    if (!job) {
      return res.status(400).json({ msg: "project not found" });

    } else {
      const userId = req.user.userId
      console.log(userId)
      const user = await login_model.findById(userId);
      console.log(user)
      const comment = await ProjectComment.create({
        author: user._id,
        body: req.body.body,
        time: moment().format('LLL'),
      });

      const commentsInJob = job.comments;
      commentsInJob.unshift(comment._id);

      const updatedJob = await Job.findOneAndUpdate(
        { _id: projectId },
        { comments: commentsInJob },
        { new: true }
      );
      return res.status(200).json({ data: updatedJob });
    }

  } catch (error) {
    console.log(error)
    return res.status(400).json({ msg: "Request failed" });
  }
};

export {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats,
  addProjectComment,
};
