const { User } = require("../models/db")

const adminMiddleware = async(req,res,next)=>{
    const user=await User.findOne({_id:req.user._id});
    if(user&&user.role==='admin'){
        next();
    }
    else{
        return res.status(401).json({msg:"user must be admin in order to access"})
    }
}

module.exports=adminMiddleware