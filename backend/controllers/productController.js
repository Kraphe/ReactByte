const {Product} = require('../models/db')
const multer = require('multer')
const path = require('path')
const fs= require('fs')
const joi = require('joi');


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}${path.extname(file.originalname)}`;
        // 3746674586-836534453.png
        cb(null, uniqueName);
    },
});

const handleMultipartData = multer({
    storage,
    limits: { fileSize: 1000000 * 5 },
}).single('image'); // 5mb


const productController={
    async create(req, res, next) {
        // Multipart form data
        handleMultipartData(req, res, async (err) => {
            if (err) {
                return res.status(500).json({msg:err})
            }
            // console.log(req.file.path);
            const filePath = req.file.path;
            console.log(filePath);
            // validation
            const productSchema = joi.object({
               name:joi.string().required(),
               price:joi.number().required(),
               size:joi.string().required()
             })
             
            const { error } = productSchema.validate(req.body);
            if (error) {
                // Delete the uploaded file
                fs.unlink(`${appRoot}/${filePath}`, (err) => {
                    if (err) 
                    return res.status(500).json({msg:err});
                });

                return res.status(500).json({msg:error.details[0].message});
                // rootfolder/uploads/filename.png
            }

            const { name, price, size } = req.body;
            let document;
            try {
                document = await Product.create({
                    name,
                    price,
                    size,
                    image: filePath,
                });
            } catch (err) {
                res.status(500).json({msg:err});
            }
            res.status(201).json(document);
        });
    },
    update(req, res, next) {
        handleMultipartData(req, res, async (err) => {
            if (err) {
                return res.status(500).json({msg:err})
            }
            let filePath;
            if (req.file) {
                filePath = req.file.path;
            }
            const productSchema = joi.object({
                name:joi.string().optional(),
                price:joi.number().optional(),
                size:joi.string().optional(),
                image:joi.string()
              })
            const { error } = productSchema.validate(req.body);
            if (error) {
                if (req.file) {
                    fs.unlink(`${appRoot}/${filePath}`, (err) => {
                        if (err) 
                        return res.status(500).json({msg:err});
                    });
                   
                }
                return res.status(500).json({msg:error.details[0].message});
                // rootfolder/uploads/filename.png
            }

            const { name, price, size } = req.body;
            let document;
            try {
                document = await Product.findOneAndUpdate(
                    { _id: req.params.id },
                    {
                        name,
                        price,
                        size,
                        ...(req.file && { image: filePath }),
                    },
                    { new: true }
                );
            } catch (err) {
                return res.json({msg:err});
            }
            res.status(201).json(document);
        });
    },
    async remove(req, res, next) {
         

        // there is another method document._doc.image which can be used to get the original path without localhost part

            const item = await Product.findOne({ _id: req.params.id });
            if(!item)
            return res.send(404).json({msg:"Product with this id not exist"})


            let filePath = item.image.split('uploads')[1];
            filePath='uploads'+filePath;
           
            fs.unlink(`${appRoot}/${filePath}`, (err) => {
                if (err) 
                return res.status(500).json({msg:err});
            })

            const deletionInfo = await Product.deleteOne({ _id: req.params.id });
            return res.json({msg: deletionInfo});
         
    },
    async getProducts(req, res, next) {
        let documents;
     
        try {
            documents = await Product.find().sort({_id:-1})
                
        } catch (err) {
            return res.status(500).json({msg:err})
        }
        return res.json(documents);
    },

    
    async getSingleProduct(req, res, next) {
        let document;
        try {
            document = await Product.findOne({ _id: req.params.id }).select(
                '-updatedAt -__v'
            );
        } catch (err) {
            return res.status(201).json({msg:err});
        }
        return res.json(document);
    },

    async getProductIdWise(req,res,next){
        let document;
        try {
            document = await Product.find({ _id:{ $in: req.body.id }, }).select(
                '-updatedAt -__v'
            );
        } catch (err) {
            return res.status(201).json({msg:err});
        }
        return res.json(document);
    }

}

module.exports=productController