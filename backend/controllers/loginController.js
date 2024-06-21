const {User,RefreshToken}=require('../models/db')
const joi=require('joi');
const bcryptjs=require('bcryptjs');
const JwtService=require('../services/JwtService')
const {REFRESH_SECRET} = require('../config')


const loginController={
    async login(req,res,next){
        const loginSchema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().required()
         })
         const {error}=loginSchema.validate(req.body);
        
         if(error)
            return res.status(422).json({msg:error.details[0].message})

         const user=await User.findOne({email:req.body.email});
         if(!user)
         return res.json({msg:"User wjth this email doesn't exist"});

        //  console.log(user.email);

         const match =await bcryptjs.compare(req.body.password,user.password);

         if(!match)
         return res.json({msg:"wrong credentials"});

         const access_token=JwtService.sign({_id:user._id,role:user.role})
         const refresh_token=JwtService.sign({_id:user._id,role:user.role,},'1y',REFRESH_SECRET)
         await RefreshToken.create({token:refresh_token})
         res.json({access_token,refresh_token})
    },

    async logout(req,res,next){
        const refreshSchema=joi.object({
            refresh_token:joi.string().required()
        })

        const {error}=refreshSchema.validate(req.body);
        if(error)
        return res.json({msg:"Invalid Refresh Token"})

        try{
            await RefreshToken.deleteOne({token:req.body.refresh_token})
        }
        catch(err){
            res.json({msg:"error he logut me " + err })
        }
        res.json({msg:"Succefully logout" })
    }
}

module.exports=loginController