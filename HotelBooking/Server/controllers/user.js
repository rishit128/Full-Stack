import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
const secret = process.env.SECRET;
import UserModal from "../models/user.js";
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json("USERNOTEXIST");

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json("INVALIDPASSWORD");

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({
      id: oldUser._id,
      name: oldUser.name,
      email: oldUser.email,
      role: oldUser.role,
      token: token,
    });
  } catch (err) {
    res.status(500).json("SOMETHINGWRONG");
  }
};
