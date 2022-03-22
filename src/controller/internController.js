const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");

const validator = require("../validator/validator");

const createIntern = async function (req, res) {
  try {
    let data = req.body;
    const { name, mobile, email, collegeName } = data;
    if (!validator.isValidRequestBody(data)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid request body" });
    }
    if (!validator.isValid(name)) {
      return res
        .status(400)
        .send({ status: false, message: " Invalid Name in request body" });
    }
    //mobile valiadtion
    if (!/^\d{10}$/.test(mobile)) {
      return res
        .status(400)
        .send({ status: false, message: "please enter 10 digit number" });
    }
    //\d means "digit," and {10} means "ten times." The ^ and $ anchor it to the start and end, so something like asdf1234567890asdf does not match.
    if (!mobile) {
      res.status(400).send({ status: false, message: "please enter mobile" });
    }

    const isMobileAlreadyUsed = await internModel.findOne({
      mobile,
      isDeleted: false,
    });
    if (isMobileAlreadyUsed) {
      return res
        .status(400)
        .send({
          status: false,
          message: `${mobile} is already used so please put valid input`,
        });
    }
    //email validation
    if (/^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]+)$/.test(email)) {
      return res
        .status(400)
        .send({ status: false, message: "mobile required compulsory" });
    }
    if (!email) {
      res.status(400).send({ status: false, message: "please enter  email" });
    }

    const isEmailAlreadyUsed = await internModel.findOne({
      email,
      isDeleted: false,
    });
    if (isEmailAlreadyUsed) {
      return res
        .status(400)
        .send({
          status: false,
          message: `${email} is already used so please put valid input`,
        });
    }
    if (!validator.isValid(collegeName)) {
      return res
        .status(400)
        .send({ status: false, message: "please put valid collegeName " });
    }

    let collegeDetail = await collegeModel.findOne({
      name: collegeName,
      isDeleted: false,
    });
    if (!collegeDetail) {
      return res
        .status(400)
        .send({ status: false, message: "no such collegeDetails Found" });
    }
    console.log(collegeDetail)

    data["collegeId"] = collegeDetail._id;
    let savedData = await internModel.create(data);
    return res
      .status(201)
      .send({
        status: true,
        message: "intern created successfully",
        data: savedData,
      });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }

  
};
module.exports.createIntern = createIntern;
//get all intern
const getAllIntern = async function (req, res) {
  try {
   const data =req.query
   if (!validator.isValidRequestBody(data)) {
    return res
      .status(400)
      .send({ status: false, message: "Invalid request body" });
  }
  const collegeName = req.query.collegeName
  if(!validator.isValid(collegeName)){
      res.status(400).send({
          status:false,message:"please enter valid college name"
      })

  }
  const details=await collegeModel.find({name:collegeName,isDeleted:false})
  if(!validator.isValid(details)){
    res.status(400).send({
        status:false,message:"please enter valid detail of college "
    })
  }
  const collegeId =details[0]._id
  const internDetail=await internModel.find({collegeId,isDeleted:false})
  if(!validator.isValid(internDetail)){
    res.status(400).send({
        status:false,message:"please enter valid detail of intern no imntern found"
    })
}
const finalData={
    "name":details[0].name,
    "fullName":details[0].fullName,
    "logoLink":details[0].logoLink,
    "interest":internDetail
}

res.status(200).send({status:true,data:finalData})




  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};
module.exports.getAllIntern = getAllIntern;
