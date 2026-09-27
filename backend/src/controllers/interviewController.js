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
            userid: req.user.id,
            resume,jobDescription,selfDescription,
            ...report
        })

        res.status(201).json({
            message : "Interview report generated succesfully",interviewReport
        })
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    generateInterviewReport
}