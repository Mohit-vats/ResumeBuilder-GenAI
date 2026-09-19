require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/database");
const {jobDescription,resume,selfDescription} = require("./src/services/temp") // to be updated to get from inputs

connectDB();

const generateReport = require("./src/services/ai.services")
generateReport(jobDescription,resume,selfDescription);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});