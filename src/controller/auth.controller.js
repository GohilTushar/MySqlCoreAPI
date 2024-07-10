import registrationSchema from "../validator/auth.validator.js";
import fs from "fs";
import bcrypt from "bcrypt";
import generateAuthToken from "../utils/generateToken.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { messageObject } from "../config/messageConstant.js";
const { user } = messageObject;
import { existanceOfUser, userCreation } from "../service/service.js";
import { publicUrl } from "../utils/charImage.js";

const signup = async (req, res) => {
  try {
    if (req.body.image == "")
      req.body.image = publicUrl(req.body.email.charAt(0));

    await registrationSchema.validateAsync(req.body);
    let imgUpload = req.body.image;

    const { name, email, password, gender, interest } = req.body;
    const userExist = await existanceOfUser(email);
    const path = req.file?.path;

    if (userExist) {
      if (path) fs.unlinkSync(path);
      return res.status(400).json({ error: user.userExisted });
    }
    if (path) {
      imgUpload = await uploadOnCloudinary(path, req.file.originalname);
      if (!imgUpload)
        return res.status(400).json({ error: user.uploadTypeError });
    }

    await userCreation(name, email, password, gender, interest, imgUpload);

    return res.status(201).json({ message: user.userCreated });
  } catch (err) {
    const path = req.file?.path;
    if (path) fs.unlinkSync(path);
    return res.status(500).json({ error: err.details[0].message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await existanceOfUser(email);
    if (!userExist)
      return res.status(401).json({ messege: user.userNotExisted });

    const isValid = await bcrypt.compare(password, userExist.password);
    if (!isValid) return res.status(401).json({ messege: user.failedLogin });

    const token = generateAuthToken({
      id: userExist.id,
      email: userExist.email,
    });

    return res.status(200).json({ messege: user.successLogin, token: token });
  } catch (err) {
    return res.status(500).json({ error: err, message: user.serverError });
  }
};

export { signup, login };
