const {Order} =require('../models/db')
const Joi = require('joi');

const orderController={


    async getOrder(req,res,next){
      
       let documents;
       console.log(req.params);

       console.log(req.params.userId)
        try {
            documents = await Order.find({userId:req.params.userId});
                
        } catch (err) {
            return res.status(500).json({msg:err})
        }
        return res.json(documents);
    },

    async saveOrder(req,res,next){

        const userId=req.body.userId;
        const totalItems=req.body.cart.totalItems;
        const items = [];
        for (const itemId in req.body.cart.items) {
                const quantity = req.body.cart.items[itemId];
                items.push({ itemId, quantity });
        }
        console.log(items);
        
        const newOrder = new Order({
            items,
            totalItems,
            userId
        });
        
        newOrder.save()
            .then(savedOrder => {
                console.log('Order saved successfully:', savedOrder);
            })
            .catch(error => {
                console.error('Error saving order:', error);
            });
        res.json(newOrder);
    }
}

module.exports=orderController