const { PDFParse } = require("pdf-parse");
const generateReport = require("../services/ai.services")
const interviewReportModel = require("../models/interviewReport.model")


const generateInterviewReport = async (req,res) => {
    try{
        const ResumePDF = req.file;
        const parser = new PDFParse({
            data: ResumePDF.buffer
        });

        const result = await parser.getText();

        const resume = result.text;
                const{jobDescription,selfDescription} = req.body;

        const report = await generateReport(jobDescription,resume,selfDescription);
        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume,jobDescription,selfDescription,
            ...report
        })

        res.status(201).json({
            message : "Interview report generated succesfully",interviewReport
        })
    }catch(err){
        console.error(err);
        return res.status(500).json({ message: "Failed to generate interview report" });
    }
}

const getAllReports = async (req, res) => {
    try {
        const reports = await interviewReportModel
            .find({ user: req.user.id })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Interview reports fetched successfully",
            reports
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to fetch interview reports" });
    }
};

const getReportByID = async (req,res) =>{
    try{
        const {interviewID} = req.params;

        const interviewReport = await interviewReportModel.findById(interviewID);

        if(!interviewReport){
            return res.status(404).json({
                message : "Requested report not found"
            })
        };

        return res.status(200).json({
            message : "Interview report fetched succesfully",interviewReport
        })
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    generateInterviewReport,
    getAllReports,
    getReportByID
}
