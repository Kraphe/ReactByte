const joi=require('joi');
const {User,RefreshToken} = require('../models/db')
const JwtService=require('../services/JwtService')
const {REFRESH_SECRET} = require('../config')


 const RefreshController ={
    async refresh(req,res,next){
        const refreshSchema=joi.object({
            refresh_token:joi.string().required()
        })

        const {error}=refreshSchema.validate(req.body);
        if(error)
        return res.json({msg:"Invalid Refresh Token"})

        const refreshtoken=await RefreshToken.findOne({token:req.body.refresh_token});
        if(!refreshtoken)
        return res.json({msg:"Invalid Refresh Token"})
        
        const {_id,role}=await JwtService.verify(refreshtoken.token,REFRESH_SECRET)
        
        const userId=_id;  // done inorder to remove confusion
        const user=await User.findOne({_id:userId});
        if(!user)
        return res.json({msg:"No user found with this refresh token"})

        const access_token=JwtService.sign({_id:user._id,role:user.role})
        const refresh_token=JwtService.sign({_id:user._id,role:user.role,},'1y',REFRESH_SECRET)
        await RefreshToken.create({token:refresh_token})
        res.json({access_token,refresh_token})

    }
} 

module.exports=RefreshController;
