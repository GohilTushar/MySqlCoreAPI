import { messageObject } from "../config/messageConstant.js";
const { user } = messageObject;
import {
  existanceOfUser,
  getUserList,
  userDeletion,
  userUpdate,
} from "../service/service.js";
import fs from "fs";
import {
  updateProfilePhoto,
  deleteFromCloudinary,
  generatePublicId,
} from "../utils/cloudinary.js";
import { publicUrl } from "../utils/charImage.js";
import registrationSchema from "../validator/auth.validator.js";

const userList = async (req, res) => {
  try {
    const users = await getUserList();
    return res.status(200).json({ users });
  } catch (err) {
    return res.status(500).json({ error: err, message: user.serverError });
  }
};

const userDetails = async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json({ userData });
  } catch (err) {
    return res.status(500).json({ error: err, message: user.serverError });
  }
};

const userDelete = async (req, res) => {
  try {
    const { id, image } = req.user;

    if (image) {
      const pId = await generatePublicId(image);
      await deleteFromCloudinary(pId);
    }

    await userDeletion(id);
    return res.status(200).json({ message: user.userDeleted });
  } catch (err) {
    return res.status(500).json({ error: err, message: user.serverError });
  }
};

const updateProfile = async (req, res) => {
  try {
    if (req.body.image == "")
      req.body.image = publicUrl(req.body.email.charAt(0));

    await registrationSchema.validateAsync(req.body);

    let imgUpload = req.body.image;
    const newUpdatedData = req.body;
    const path = req.file?.path;
    const { id, image } = req.user;

    if (req.user.email != newUpdatedData.email) {
      if (path) fs.unlinkSync(path);
      return res.status(400).json({ message: user.userExisted });
    }
    const publicId = await generatePublicId(image);
    if (!path) await deleteFromCloudinary(publicId);

    if (path) {
      imgUpload = await updateProfilePhoto(
        image,
        path,
        req.file.originalname,
        publicId
      );
      if (!imgUpload)
        return res.status(400).json({ error: user.uploadTypeError });
    }

    const updated = await userUpdate(newUpdatedData, id, imgUpload);
    return res.status(201).json({ message: updated });
  } catch (err) {
    const path = req.file?.path;
    console.log(path);
    if (path) fs.unlinkSync(path);
    return res.status(500).json({ error: err.details[0].message });
  }
};

export { userList, userDetails, userDelete, updateProfile };

