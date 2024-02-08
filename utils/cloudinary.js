
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
const upload_to_cloudinary = async (localimgpaths) => {

    
    if (!localimgpaths) return null;
    
    const cloudinaryUrls = [];

    // upload local file to cloudinary
     for (const localimgpath of localimgpaths) {
        try {
          
            console.log(localimgpath);
            const response = await cloudinary.uploader.upload(localimgpath, { resource_type: "auto" });
            cloudinaryUrls.push(response.url);
            // delete file after upload from server...
            fs.unlinkSync(localimgpath);
        } catch (error) {
            console.log("Failed to upload to Cloudinary:", error);
            // If we fail to upload the image, delete the local file
            fs.unlinkSync(localimgpath);
        }
    }

    
    return cloudinaryUrls;

}


export { upload_to_cloudinary };