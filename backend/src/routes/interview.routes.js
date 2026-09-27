const {Router} = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const upload = require("../middlewares/upload.middleware")
const interviewControllers = require("../controllers/interviewController")

const interviewRouter = Router()

/**
 * @route POST api/interview/
 * @description 
 * @access Private
 */
interviewRouter.post("/",authMiddleware.authUser , upload.single("resume"),interviewControllers.generateInterviewReport)


module.exports = interviewRouter