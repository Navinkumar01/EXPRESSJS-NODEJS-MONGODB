const { response } = require("express");
const express = require("express");
const router = express.Router();
const Product = require('../model/product.js');
const { authMiddleware } = require("./authenticate.js");

const JWT_SECRET = "some-very-secure-string";
const isValidObject = (obj) => Object.keys(obj).length>0;

//Fetch posts
router.get('/',authMiddleware, async(req, res) => {             
    const response = {
            success : true,
            code:200,
            message:"Product Details",
            error:null,
            data: null,
            resource:req.originalUrl,
    };
    try{
        isDeleted = false;
        res.locals.userId;
        const products = await Product.find();
        response.data = { products };
        return res.status(200).json(response);

    }
    catch(error){
        response.error=error;
        response.message=error.message;
        response.code = error.code ? error.code : 500;
        return res.status(500).json(response);
    }
});

//getbyId

router.get('/:id', async (req, res) => {
    const productId = req.params.id;
    const response = {
        success : true,
        code:200,
        message:"Product Details",
        error:null,
        data: null,
        resource:req.originalUrl,
};
   
    try{
        const products = await Product.findById({_id:productId });
            //userId: res.locals.userId,
    
            if(!products) throw new Error("Product doesnot exist");
            response.data= { products };
            return res.status(500).json(response);
    }
    catch(error){
        response.error=error;
        response.message=error.message;
        response.code = error.code ? error.code : 500;
        return res.status(500).json(response);

    }
});


//Create Post

router.post('/',authMiddleware, async (req, res) =>{
    const product = req.body;
    const response = {
        success : true,
        code:200,
        message:"Product Added Successfully",
        error:null,
        data: null,
        resource:req.originalUrl,
    };
    if(!product && !(object.keys(product).length )){
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data";
        response.error = "Invalid request data";
        return res.status(400).json(response);
    }; 
    if(!product.Name || typeof product.Name !== "string" || product.Name.trim().length == 0 ){
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data, Name is required";
        response.error = "Invalid request data.Name is required";
        return res.status(400).json(response)        
    }; 
    const prod = new Product({
        //userId: product.userId,
        Name: product.Name,
        price: product.price,
        quantity: product.quantity,
        category: product.category,
        subCategory: product.subCategory,
        userId: res.locals.userId,
    
    })
    try{
        const savedPost  = await prod.save();
        response.data = { savedPost };
        return res.status(500).json(response);

    }
    catch(err){
        res.json({
            success : false,
            code:404,
            message:err.message,
            error:err,
            data:null,
            resource:req.url,
        })
    }
});


//Update Post

router.put('/:id',authMiddleware, async(req, res) => {
    const userId = req.params.id;
    const product = req.body;
    res.locals.userId;
    try{
         const updatedPost = await Product.updateMany(
            {_id: userId,
              isDeleted: false,
            },
            {$set: {Name: product.Name, 
                    category: product.category,
                    price: product.price,
                    quantity: product.quantity,
                    category: product.category,
                    subCategory: product.subCategory,
                }}
                );
                res.status(500).json({
                success : true,
                code:200,
                message:"Product Updated Successfully",
                error:null,
                data:updatedPost,
                resource:req.url
            });
    }
    catch(err){
        res.json({message : "Invalid Request Id"})
    }
})

//Delete Post
router.delete('/:id',authMiddleware, async (req, res) =>{
    const userId = req.params.id;
    if(!isValidObject(userId)){
        res.status(400).json({
            success : false,
            code:400,
            message:"Invalid Product ID",
            error:null,
            data:null,
            resource:req.url,
        });
        }
   try{   
    // const IsPresent = await Product.findOne({_id: userId});
    // console.log(IsPresent.userId);
       const removedProduct = await Product.remove({ _id: userId ,isDeleted: false });
       if(!removedProduct){
       res.status(404).json({
        success : false,
        code:400,
        message:"Invalid request, product ID is not found",
        error:null,
        data:null,
        resource:req.url,
    }) 
   } 
   removedProduct.isDeleted = true;
   removedProduct.save();
   res.status(204).json({
    success : true,
    code:200,
    message:"Product deleted successfully",
    error:null,
    data:{ removedProduct },
    resource:req.url,
})
   }
catch(err){
    res.status(500).json({
        success : false,
        code:500,
        message:"Invalid Id, product details not found",
        error:null,
        data:null,
        resource:req.url,
    });
   }
});

module.exports = router;