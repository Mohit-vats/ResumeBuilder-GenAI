const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

// require routes
const authRouter = require('./routes/user.routes');

//using routes
app.use('/api/auth', authRouter);

module.exports = app;