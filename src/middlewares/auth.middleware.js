const jwt=require('jsonwebtoken');
const blacklistModel=require('../models/blacklist.model');


const authUser = async (req,res,next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message:'Unauthorized, token not found'});
        }
        const blacklistedToken = await blacklistModel.findOne({ token });
        if (blacklistedToken) {
            return res.status(401).json({ message: 'Unauthorized, token is invalid.' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({message:'Unauthorized, invalid token'});
    }
}

module.exports = {
    authUser
};