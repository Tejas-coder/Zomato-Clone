   
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Router = express.Router();

//Models
import { UserModel } from "../../database/user";

//Validation
import {ValidateSignUp, ValidateSignIn} from "../../Validation/auth"

/*
Route         /signup
Descrip       Signup with email and password
Params        None
Access        Public
Method        POST
*/

Router.post("/signup", async(req,res) => {
  try {
    await ValidateSignUp(req.body.credentials)

    const { email, password, fullname, phoneNumber} = req.body.credentials;

    //Check whether email or phone number exists
    const checkUserByEmail = await UserModel.findOne({ email });
    const checkUserByPhone = await UserModel.findOne({ phoneNumber });

    if(checkUserByEmail || checkUserByPhone) {
      return res.json({ error: "User already Exists"});
    }

    //hashing and salting
    const bcryptSalt = await bcrypt.genSalt(8);

    const hashedPassword = await bcrypt.hash(password, bcryptSalt);

    //DB
    await UserModel.create({
      ...req.body.credentials,
      password: hashedPassword     
    });

    //JWT Auth Token
    const token = jwt.sign({user: {fullname, email}}, "ZomatoApp");

    return res.status(200).json({token});

  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

/*
Route         /google
Descrip       google sign in
Params        None
Access        Public
Method        GET
*/

// Router.get("/google", passport.authenticate("google", {
//   scope: [
//     ""
//   ]
// }));

export default Router;
