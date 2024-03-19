const oauthUser = require("../models/oauthUser");
require("dotenv").config();
const { default: fetch } = require("node-fetch");
const Registration = require("../models/Registration");
const generateUniqueIdAndCheck = require('../utils/generateId');

exports.getUser = async(req, res) => {
  const email = req.params.email;
  try{
    let registration = await Registration.findOne({email})
    if(!Registration){
      return res.status(400).json({
        error: "USER email does not exists",
      });
    }
    res.send({details : registration})
  }catch(err){
    res.send({errMessage: err})
  }
  

}

exports.Oauth = async (req, res) => {
  const { googleAccessToken } = req.body;
  fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: {
      "Authorization": `Bearer ${googleAccessToken}`,
      "Accept": "*/*"
    }
  }).then(async (response) => {
    const data = await response.json()
    const firstName = data.given_name ? data.given_name : '';
    const lastName = data.family_name ? data.family_name : '';
    const email = data.email;
    const picture = data.picture;
    let user = await oauthUser.findOne({ email })
    let register = await Registration.findOne({email})
    if (!user && !register) {
      let uniqueId = await generateUniqueIdAndCheck();
      let college = "0";
      const name = firstName + " " + lastName
      if(email.split('@')[1] === 'student.nitw.ac.in'){
        college="NITW"
        register= await Registration.create({uniqueId,email,name,college, gender:'', referralId:'', paidForAccomodationDay0: 1, paidForAccomodationDay1: 1, paidForAccomodationDay2: 1, paidForAccomodationDay3: 1, paidForProshow1: 1, paidForProshow2: 1, paidForProshow3: 1, paidForRegDay1: 1, paidForRegDay2: 1, paidForRegDay3: 1})
      } else{
        register= await Registration.create({uniqueId,email, name, college, gender:'', referralId:''})
      }
      user = await oauthUser.create({ email, firstName, lastName, profilePicture: picture })
    }else if(user && !register){
      let uniqueId = await generateUniqueIdAndCheck();
      let college = "0"
      const name = firstName + " " + lastName
      if(email.split('@')[1] === 'student.nitw.ac.in'){
        college="NITW"
        register= await Registration.create({uniqueId, email,name,college, gender:'', referralId:'', paidForAccomodationDay0: 1, paidForAccomodationDay1: 1, paidForAccomodationDay2: 1, paidForAccomodationDay3: 1, paidForProshow1: 1, paidForProshow2: 1, paidForProshow3: 1, paidForRegDay1: 1, paidForRegDay2: 1, paidForRegDay3: 1})
      } else{
        register= await Registration.create({uniqueId,email,name,college,gender:'', referralId:'',})
      }
    }

    res
      .status(200)
      .json({user})
  }).catch((err) => {
    console.log(err)
    res.status(400).json({message: "Invalid access token!"})
  })
}
