const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// require routes
const authRouter = require('./routes/user.routes');
const interviewRouter =require('./routes/interview.routes');
const { ApiError } = require('@google/genai');

//using routes
app.use('/api/auth', authRouter);
app.use("/api/interview", interviewRouter)

module.exports = app;