const {Order} =require('../models/db')
const Joi = require('joi');

const orderController={


    async getOrder(req,res,next){
      
       let documents;

       console.log(req.params.userId)
        try {
            documents = await Order.find({userId:req.params.userId});
                
        } catch (err) {
            return res.status(500).json({msg:err})
        }
        return res.json(documents);
    },

    async saveOrder(req,res,next){
        const { userId, items, totalItems } = req.body;
        console.log(req.body);
        const itemsArray = Object.keys(items).map(itemId => ({
            itemId,
            quantity: items[itemId]
        }));
        // console.log(itemsArray,userId,totalItems);
        if(totalItems===0)
        return res.json({msg:"empty cart"})
        
        const newOrder = new Order({
            userId,
            items: itemsArray,
            totalItems
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