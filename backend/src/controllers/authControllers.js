const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
const BlacklistModel = require('../models/blacklist.model');

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
const registerUserController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const userExists = await userModel.findOne({
            $or: [{ username }, { email }]
        });
        if (userExists) {
            if (userExists.username === username) {
                return res.status(400).json({ message: 'Username already exists' });
            }else if (userExists.email === email) {
                return res.status(400).json({ message: 'Email already registered' });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({
            message: 'User logged in successfully',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });

    }
    catch (error) {console.log(error)}
}

/**
 * @route POST /api/auth/login
 * @desc Login a user,expects email and password in the request body
 * @access Public
 */
const loginUserController = async (req, res) => {
    try{
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const user = await userModel.findOne({ email });
        const isPasswordValid = user ? await bcrypt.compare(password, user.password) : false;
        if(!user || !isPasswordValid){
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({
            message: 'User logged in successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    }catch(error){console.log(error)}
}

/**
 * @route POST /api/auth/logout
 * @desc Logout a user, expects token in the request body
 * @access Public
 */
const logoutUserController = async (req, res) => {
    try {
        const { token } = req.cookies; // Assuming the token is sent in the cookie
        if (!token) {
            return res.status(400).json({ message: 'Token is required' });
        }

        await BlacklistModel.create({ token });
        res.clearCookie('token');
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * @route GET /api/auth/profile
 * @description Get the profile of the logged-in user
 * @access Private
 */
const getMeUserController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({
            message : 'User profile fetched successfully',
            user : {
                user_id: user._id,
                username: user.username,
                email: user.email
            }}
        )
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeUserController
};
