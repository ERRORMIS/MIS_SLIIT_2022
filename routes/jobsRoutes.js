import express from 'express'
const router = express.Router()

import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats,
  addProjectComment,
} from '../controllers/jobsController.js'

router.route('/').post(createJob).get(getAllJobs)
// remember about :id
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteJob).patch(updateJob)
router.route("/:projectId/post-comment").patch(addProjectComment)

export default router
