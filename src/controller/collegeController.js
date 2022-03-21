const collegeModel = require("../models/collegeModel");

const validator =require("../validator/validator")

//create an college entries
const createCollege =async function(req,res){
    try {
        let data =req.body;
        //validation starts
        if(!validator.isValidRequestBody(data)){
            return res.status(400).send({status:false,message:"No college detail found"});
        }else{
            const {name, fullName , logoLink}=data;     //destruction method
            if(!validator.isValid(name)){
                return res.status(400).send({status:false,message:"Enter valid Name"});
            }
            if(!validator.isValid(fullName)){
                return res.status(400).send({status:false,message:"please enter fullname"});
            }
            if(!validator.isValid(logoLink)){
                return res.status(400).send({status:false,message:"please enter valid logolink"});
            }
            const isNameisAlreadyUsed =await collegeModel.findOne({name,isDeleted:false});
            if(isNameisAlreadyUsed){
                return res.status(400).send({status:false,message:`${name} is already used so please put valid input`})
            }
            const isLogoAlreadyUsed  =await collegeModel.findOne({logoLink,isDeleted:false});
            if( isLogoAlreadyUsed){
                return res.status(400).send({status:false,message:`${logoLink} is already used so please put valid input`})
            }
            
            if(!logoLink){
                res.status(400).send({status:false,message:"please enter  logoLink"})
            }

          
        const Name =name.toLowerCase().split(" ").join("")
        data["name"] =Name;

        const savedData =await collegeModel.create(data);
        return res.status(201).send({status:true,message:"college created Successfully",data:savedData})
        }
    } catch (error) {
        return res.status(500).send({
            status:false,
            message:error.message,
        });
        
    }
};
module.exports.createCollege=createCollege
  