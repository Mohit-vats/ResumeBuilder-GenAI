const {Router} = require('express');
const authRouter = Router();

const authController = require('../controllers/authControllers');
const authMiddleware = require('../middlewares/auth.middleware');


/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post('/register', authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */
authRouter.post('/login', authController.loginUserController);

/**
 * @route POST /api/auth/logout
 * @desc Logout a user
 * @access Public
 */
authRouter.get('/logout', authController.logoutUserController);

/**
 * @route GET /api/auth/profile
 * @description Get the profile of the logged-in user
 * @access Private
 */
authRouter.get('/get-me',authMiddleware.authUser, authController.getMeUserController);


module.exports = authRouter;