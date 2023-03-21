import UserModal from "../models/user.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import Ticket from "../models/tickets.js";
import {
  USERNOTEXIST,
  INVALIDPASSWORD,
  SOMETHINGWRONG,
  USERALREADY,
} from "../constants/actionmessage.js";
const secret = process.env.SECRET;

const resolvers = {
  signup: async ({ userInput }, req) => {
    const { email, password, phone, name } = userInput;

    try {
      const oldUser = await UserModal.findOne({ email });

      if (oldUser) {
        const error = new Error(USERALREADY);
        console.log(error);
        error.code = 400;
        error.message = USERALREADY;
        return error;
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const result = await UserModal.create({
        email,
        password: hashedPassword,
        name: `${name}`,
        phone: phone,
      });

      const token = jwt.sign({ email: result.email, id: result._id }, secret, {
        expiresIn: "1h",
      });

      return { ...result._doc, _id: result._id.toString(), token };
    } catch (error) {
      console.log(error);

      return { SOMETHINGWRONG };
    }
  },
  login: async ({ email, password }, req) => {
    try {
      const oldUser = await UserModal.findOne({ email });

      if (!oldUser) {
        const error = new Error(USERNOTEXIST);

        error.code = 400;
        error.message = USERNOTEXIST;
        return error;
      }

      const isPasswordCorrect = await bcrypt.compare(
        password,
        oldUser.password
      );

      if (!isPasswordCorrect) {
        const error = new Error(INVALIDPASSWORD);

        error.code = 400;
        error.message = INVALIDPASSWORD;
        return error;
      }

      const token = jwt.sign(
        { email: oldUser.email, id: oldUser._id },
        secret,
        { expiresIn: "1h" }
      );
      return { ...oldUser._doc, _id: oldUser._id.toString(), token };
    } catch (err) {
      return { SOMETHINGWRONG };
    }
  },
  fetchtickets: async () => {
    try {
      const ticketalldata = await Ticket.find().sort({ Date: -1 });

      const ticketdata = ticketalldata.map((data) => {
        return { ...data._doc, _id: data._id.toString() };
      });

      return ticketdata;
    } catch (error) {
      return { message: error.message };
    }
  },
  updatetickets: async ({ id, empid, ticket_desc }, req) => {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No ticket with id: ${id}`);
    const newTicket = await Ticket.findById(id);

    newTicket.ticket_desc = ticket_desc;

    newTicket.empid = empid;

    await newTicket.save();
    return {
      ...newTicket._doc,
      _id: newTicket._id.toString(),
    };

    res.json(updatedTicket);
  },
};
export default resolvers;
