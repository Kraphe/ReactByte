const {User,RefreshToken}= require('../models/db')
const joi = require('joi');
const bcrypt = require('bcryptjs')
const JwtService=require('../services/JwtService')
const {REFRESH_SECRET} = require('../config')


//password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
const registerController={
    async register (req,res,next){
         const registerSchema = joi.object({
            name: joi.string().min(3).max(30).required(),
            email: joi.string().email().required(),
            password: joi.string().required(),
            repeat_password: joi.string().required()
         })
         const {error}=registerSchema.validate(req.body);   
        //  console.log(req.body);
        
         if(error)
           { return res.status(422).json({msg:error.details[0].message})}

          const isExist=await User.findOne({email:req.body.email});
          if(isExist)
          return res.status(422).json({msg:"Email already Exist"})
          
          const {name, email, password, repeat_password} = req.body;
          
          if(password!==repeat_password)
          {return res.status(422).send({msg:"password and repeat password should be same"})}

          const hashedpassword= await bcrypt.hash(password,10);

          const newUser=new User({
            name,
            email,
            password:hashedpassword
          })
          const result = await newUser.save()
          const access_token=JwtService.sign({_id:result._id,role:result.role})
          const refresh_token=JwtService.sign({_id:result._id,role:result.role,},'1y',REFRESH_SECRET)
          await RefreshToken.create({token:refresh_token})
          res.json({access_token,refresh_token})
    }
}

module.exports = registerController