const JwtService = require("../services/JwtService");
const {REFRESH_SECRET} = require('../config');

const authMiddleware = async (req,res,next)=>{
    let authHeader=req.headers.authorization ;
    // console.log(authHeader);
    if(!authHeader)
    return res.json({msg:"Header missing"})

    const token= authHeader.split(' ')[1];
    console.log(token);
    try{
        const {_id,role}=await JwtService.verify(token);
        req.user={}  // creted an empty object then adding property like _id and role
        req.user._id=_id;
        req.user.role=role;
        next();
    }
    catch(err){
        return res.send(err);
    }
}


module.exports=authMiddleware