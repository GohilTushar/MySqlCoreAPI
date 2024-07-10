import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { imgObject } from "../config/imageConstant.js";
import dotenv from "dotenv";
dotenv.config({});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function checkFileType(file) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file).toLowerCase());
  if (extname) return true;
}

const generatePublicId = async (image) => {
  const imgObj = image;
  const pIdFull = imgObj.split("/");
  const pIdForImage = pIdFull[pIdFull.length - 1];
  const pIdWithExt = pIdForImage.split(".");
  return pIdWithExt[0];
};

const generateCloudOwner = async (image) => {
  const imgObj = image;
  const pIdFull = imgObj.split("/");
  return pIdFull[3];
};

const uploadOnCloudinary = async (localFilePath, fileName) => {
  try {
    const file = checkFileType(fileName);
    if (!file) {
      fs.unlinkSync(localFilePath);
      return null;
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: imgObject.folder,
      resource_type: "auto",
    });
    console.log("file is uploaded on cloudinary ", response.secure_url);
    fs.unlinkSync(localFilePath);
    return response.secure_url;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    const response = await cloudinary.uploader.destroy(
      `${imgObject.folder}/${publicId}`
    );
    console.log("File deleted from Cloudinary", response);
    return response;
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error);
    throw error;
  }
};

const updateProfilePhoto = async (image, localFilePath, fileName, publicId) => {
  try {
    const cloudOwner = await generateCloudOwner(image);
    if (cloudOwner == "dtgi1lfmo") await deleteFromCloudinary(publicId);
    return await uploadOnCloudinary(localFilePath, fileName);
  } catch (error) {
    console.error("Error updating file from Cloudinary:", error);
    throw error;
  }
};

export {
  uploadOnCloudinary,
  deleteFromCloudinary,
  updateProfilePhoto,
  generatePublicId,
};
