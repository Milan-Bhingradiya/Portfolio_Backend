
import fs from "fs";
import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});


import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// this function send local img to cloudinary and then delete local copy at line 26..// 
const upload_to_cloudinary = async (list_of_file_obj) => {


    if (!list_of_file_obj) return null;

    const cloudinaryUrls = [];

    // upload local file to cloudinary
    for (const file_obj of list_of_file_obj) {
        try {
            //   file_obj look like this
            //       fieldname: 'photos',
            //       originalname: 'IMG_20231006_135716.jpg',
            //       encoding: '7bit',
            //       mimetype: 'image/jpeg',
            //       buffer: <Buffer ff d8 ff e1 54 ff 45 78 69 66 00 00 4d 4d 00 2a 00 00 00 08 00 0e 01 0f 00 02 00 00 00 08 00 00 00 b6 01 01 00 
            //       04 00 00 00 01 00 00 12 00 01 12 00 03 ... 6761045 more bytes>,
            //       size: 6761095
            //     }

            // Convert buffer to Base64-encoded data URI
            const dataUri = `data:${file_obj.mimetype};base64,${file_obj.buffer.toString('base64')}`;

            const response = await cloudinary.uploader.upload(dataUri, { resource_type: "auto" });
            cloudinaryUrls.push(response.url);
            // delete file after upload from server...
            file_obj.buffer = null;
        } catch (error) {
            console.log("Failed to upload to Cloudinary:", error);
            // If we fail to upload the image, delete the local file

        }
    }


    return cloudinaryUrls;

}


export { upload_to_cloudinary };