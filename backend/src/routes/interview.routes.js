const {Router} = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const upload = require("../middlewares/upload.middleware")
const interviewControllers = require("../controllers/interviewController")

const interviewRouter = Router()

/**
 * @route POST interview/
 * @description generate report
 * @access Private
 */
interviewRouter.post("/",authMiddleware.authUser , upload.single("resume"),interviewControllers.generateInterviewReport)


/**
 * @route GET interview/:interview
 * @description gets element by id
 * @access Private
 */
interviewRouter.get("/report/:interviewID",authMiddleware.authUser ,interviewControllers.getReportByID)



/**
 * @route GET interview/
 * @description gets sll element by id
 * @access Private
 */
interviewRouter.get("/report",authMiddleware.authUser ,interviewControllers.getAllReports)

/**
 * @route GET /report/pdf/:interviewID
 * @description gives updated pdf
 * @access Private
 */
interviewRouter.get("/report/pdf/:interviewID",authMiddleware.authUser ,interviewControllers.getUpdatedPDF)

module.exports = interviewRouter