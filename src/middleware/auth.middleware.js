import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import { messageObject } from "../config/messageConstant.js";
const { user } = messageObject;
const userMsg = user;

const authenticateUser = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ message: userMsg.noToken });

  try {
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    const user = await User.findByPk(decoded.id);

    if (!user) return res.status(404).json({ message: userMsg.userNotExisted });

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: userMsg.invalidToken });
  }
};

export default authenticateUser;
