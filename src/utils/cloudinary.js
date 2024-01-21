import fs from "fs";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_COLUD_NAME,
  api_key: process.env.CLOUDINARY_COLUD_KEY,
  api_secret: process.env.CLOUDINARY_COLUD_SECRET,
});

const uploadOnCloudinary = async function (localFilePath) {
  try {
    if (!localFilePath) {
      return null;
    }
    //Upload file to cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //File has been uploaded successfully
    console.log("File is uploaded on cloudinary", response.url);

    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //Removes the locally saved temp files as the upload operation failed
    return null;
  }
};
cloudinary.uploader.upload(
  "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" },
  function (error, result) {
    console.log(result);
  }
);

export { uploadOnCloudinary };
