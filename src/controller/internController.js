const internModel = require("../models/internModel");


const validator =require("../validator/validator")


const createIntern = async function(req,res){

    try {
        let data = req.body;
        const {name,mobile,email,collegeName}=data;
        //validation start
        if(!validator.isValidRequestBody(data)){
            return res.status(400).send({status:false,message:"Invalid request body"});
        }
        if(!validator.isValid(name)){
            return res.status(400).send({status:false,message:" Invalid Name in request body"});
        }
        //mobile validation
        if(!validator,isvalid(mobile)){
            return res.status(400).send({status:false,message:"please put valid mobile number"});
        }
        if(/^\d{10}$/.test(mobile)) {   //\d means "digit," and {10} means "ten times." The ^ and $ anchor it to the start and end, so something like asdf1234567890asdf does not match.
            return res.status(400).send({status:false,message:`${mobile} it is not a valid mobile no pls enter valid number to continue`})
            // value is ok, use it
        }
        if(!validator,isvalid(email)){
            return res.status(400).send({status:false,message:"please put valid emailId "});
        }
        if(/^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]+)$/.test(email)){
            return res.status(400).send({status:false,message:`${email} it is not a valid email id pls enter valid email to continue`})
        }
        if(!validator,isvalid(collegeName)){
            return res.status(400).send({status:false,message:"please put valid collegeName "});
        }


        
        let savedData = await internModel.create(data)
        return res.status(201).send({status:true,message:"intern created successfully",data:savedData})
        
    } catch (error) {
        return res.status(500).send({
            status:false,
            message:error.message,
        });
        
    }
    

}
module.exports.createIntern=createIntern