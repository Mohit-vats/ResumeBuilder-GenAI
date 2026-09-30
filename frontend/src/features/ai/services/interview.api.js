import axios from "axios";

const interview_api = axios.create({
    baseURL: "http://localhost:3000/api/interview",
    withCredentials : true
})

export const generateReport = async ({jD , selfD, resumeFile}) =>{
    const formData = new FormData()
    formData.append("jobDescription",jD)
    formData.append("selfDescription",selfD)
    formData.append("resume", resumeFile )

    const response = await interview_api.post("/" , formData , {
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })
    return response.data;
}

export const getAllReports = async () => {
    const response = await interview_api.get("/report");
    return response.data;
};

export const getReportByID = async (interviewID) => {
    const response = await interview_api.get(`/report/${interviewID}`);
    return response.data;
}

export const getUpdatedPDF = async (interviewID) => {
    const response = await interview_api.get(
        `/report/pdf/${interviewID}`,
        {
            responseType: "blob",
        }
    );

    return response.data;
};
