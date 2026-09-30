import { useContext } from "react";
import {
    generateReport as createReport,
    getAllReports as fetchAllReports,
    getReportByID as fetchReportByID,
} from "../services/interview.api";
import { interviewContext } from "../interview.context";


const useInterview = () => {
    const context = useContext(interviewContext);

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider.");
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context;

    const generateInterviewReport = async ({ jobDescription, selfDescription, resume }) => {
        setReport(null);
        setLoading(true);
        try {
            const response = await createReport({
                jD: jobDescription,
                selfD: selfDescription,
                resumeFile: resume,
            });
            setReport(response.interviewReport);
            return response.interviewReport;
        }catch(err){
            console.log(err)
        } finally {
            setLoading(false);
        }
    };

    const getInterviewReports = async () => {
        setLoading(true);
        try {
            const response = await fetchAllReports();
            setReports(response.reports ?? []);
            return response.reports ?? [];
        } finally {
            setLoading(false);
        }
    };

    const getInterviewReportByID = async (interviewID) => {
        setLoading(true);
        try {
            const response = await fetchReportByID(interviewID);
            console.log(response.interviewReport);
            setReport(response.interviewReport);
            return response.interviewReport;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        report,
        reports,
        generateInterviewReport,
        getInterviewReports,
        getInterviewReportByID,
    };
};

export default useInterview;
