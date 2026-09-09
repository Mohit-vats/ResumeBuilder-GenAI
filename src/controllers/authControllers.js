const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

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
        res.status(201).json({ message: 'User registered successfully' }); 

    }
    catch (error) {console.log(error)}
}

module.exports = {
    registerUserController
};
