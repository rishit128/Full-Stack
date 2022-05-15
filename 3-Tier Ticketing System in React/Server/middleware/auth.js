import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import "dotenv/config";
const secret = process.env.SECRET;

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      console.log("hi");
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } else {
      console.log("first");
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    res.json({ message: "Invalid Token" });
  }
};

export default auth;

export const validateUser = [
  body("email", "Enter a valid email").isEmail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

export const validateUserSignUp = [

  body("name", "Enter valid  name.").exists(),
  body("email", "Enter a valid email").exists().isEmail(),
  

  body("phone", "Phonenumber must be 10 characters.")
    .exists()

    .isLength({ min: 10, max: 10 }),

  body("password", "Password is invalid.")
    .exists()
  
    .isLength({ min: 8, max: 16 }),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];
