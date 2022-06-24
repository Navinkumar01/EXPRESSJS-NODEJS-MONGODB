const mongoose = require("mongoose");
const schema = mongoose.schema;

const productSchema = new mongoose.Schema({
    userId:{

        type:String,
        required:true

    },
    Name:{
        type:String,
        required:true,
        
    },
    description:{
        type:String,
        required:false,
        
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    subCategory:[{
        type:String,
        required:false
    }],
    createdAt:{
        type:Date,
        default:Date.now
    },
    modifiedAt:{
        type:Date,
        default: Date.now
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    deletedAt:{
        type:Date,
        default:null
    },
    
})
{ timestamps: true };


module.exports = mongoose.model("Product", productSchema);