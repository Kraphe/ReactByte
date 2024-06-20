const { User } = require("../models/db")

const userController={
    async me(req,res,next){
        const user = await User.findOne({_id: req.user._id})
        if(!user)
        res.json({msg:"User not found userController"})
    
    } 
}

module.exports=userController