import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import UserModal from "../models/user.js";
import {USERNOTEXIST,INVALIDPASSWORD,SOMETHINGWRONG,USERALREADY} from '../constants/actionmessage.js'
const secret = process.env.SECRET;
import { validateEmail} from '../helpers/validation.js'
import {check,validationResult} from 'express-validator'
export const signin = async (req, res) => {


  const { email, password } = req.body;
  // check(email, 'Please include a valid email').isEmail(),
  
  // async (req, res) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }}
  if (!validateEmail(email)) {
    return res.status(400).json({
      message: "invalid email address",
    });
  }
  try {
 
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json(USERNOTEXIST);

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json(INVALIDPASSWORD);

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    console.log(err)
    res.status(500).json(SOMETHINGWRONG);
  }
};

export const signup = async (req, res) => {
  const { email, password, phone, name } = req.body;


  try {
    const oldUser = await UserModal.findOne({ email });
    
    if (oldUser) return res.status(400).json(USERALREADY);

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email, password: hashedPassword, name: `${name}`,phone:phone });

    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );
  
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json(SOMETHINGWRONG);
    
  
  }
};
