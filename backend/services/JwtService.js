const {JWT_SECRET} = require('../config');
const jwt=require('jsonwebtoken')


const  JwtService={
    sign(payload,expiry='60s',secret=JWT_SECRET){
        return jwt.sign(payload,secret,{expiresIn:expiry});
    },

    verify(token,secret=JWT_SECRET){
        return jwt.verify(token,secret);
    }
}

module.exports=JwtService