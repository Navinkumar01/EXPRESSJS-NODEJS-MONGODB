const UserModel = require("../model/userSchema");
const jwt = require("jsonwebtoken");
const { isValid, isValidEmail, isValidObject, isValidString } = require("../utils/validator.js");

const login = async (req, res) =>{
    const data = req.body;
    if(!isValid(data) || (isValid(data) && !isValidObject(data))){
        return res.status(400).json({
            success: false,
            code: 400,
            data: null,
            error: null,
            message: "Invalid Request body",
            resource: req.originalUrl
        });
    }
    
    if(!isValid(data.email) || (isValid(data.email) && !isValid(data.email))){
        return res.status(400).json({
            success: false,
            code: 400,
            data: null,
            error: null,
            message: "Invalid Email Id",
            resource: req.originalUrl
        });
    }

    if(!isValid(data.password) || (isValid(data.password) && !isValidString(data.password))){
        return res.status(400).json({
            success: false,
            code: 400,
            data: null,
            error: null,
            message: "Invalid Password",
            resource: req.originalUrl
        });
    }
    
    try{
        const user = await UserModel.findOne({
            email: data.email, password: data.password
        });
        if(!user){
            return res.status(404).json({
                success: false,
                code: 404,
                data: null,
                error: null,
                message: "Invalid user credentials. The user email and password donot match",
                resource: req.originalUrl
            });
        }
    }
    catch(err)
    {
        return res.status(404).json({
            success: false,
            code: 404,
            data: null,
            error: null,
            message: "Invalid user credentials. The user email and password donot match",
            resource: req.originalUrl
        });
    }
    }
    

