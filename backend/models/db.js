const mongoose =require('mongoose')
const {APP_URL} = require('../config')


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password:String,
    role: {type: String, default: 'customer'}
}) 
const User=mongoose.model('User',userSchema);

const refreshTokenSchema= new mongoose.Schema({
    token: {type:String,unique:true},
})
const RefreshToken=mongoose.model('RefreshToken',refreshTokenSchema);


const productSchema = new mongoose.Schema({
    name:{type:String, required:true},
    price:{type:String, required:true},
    size:{type:String, required:true},
    image:{type:String, required:true, get: (image)=>{
        return  `${APP_URL}${image}`
    } }},
    {
        toJSON: {getters:true} 
    }
)
const Product=mongoose.model('Product',productSchema)

const orderSchema = new mongoose.Schema({
    items: [{
        itemId: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalItems: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Order=mongoose.model('Order', orderSchema); 


module.exports= {
    User,
    RefreshToken,
    Product,
    Order
}