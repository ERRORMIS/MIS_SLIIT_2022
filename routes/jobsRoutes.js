import express from 'express'
const router = express.Router()

import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats,
  addProjectComment,
  filterUsersByProjectRequirement
} from '../controllers/jobsController.js'

router.route('/').post(createJob).get(getAllJobs)
// remember about :id
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteJob).patch(updateJob)
router.route("/:projectId/post-comment").patch(addProjectComment)
router
  .route("/filterUsersByProjectRequirement")
  .post(filterUsersByProjectRequirement);

export default router
