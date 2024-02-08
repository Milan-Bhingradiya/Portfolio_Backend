import { Project } from "../models/Project.models.js"
import { upload_to_cloudinary } from "../utils/cloudinary.js"


import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getproject = async (req, res) => {
    try {
        console.log(__dirname);
        console.log(__dirname);
        console.log(__dirname);
        console.log(__dirname);
        console.log(__dirname);
        // Find all projects
        const projects = await Project.find();

        return res.json({ "projects": projects })

    } catch (error) {
        console.error("Error in retrieving projects:", error);
        return res.json({ "status": "false", "error": error })
    }

}


const addproject = async (req, res) => {
    try {

        // console.log("req.files");
        // console.log(req.files);
        // look like this..
        // photos: [
        //     {
        //       fieldname: 'photos',
        //       originalname: 'IMG_20231006_135716.jpg',
        //       encoding: '7bit',
        //       mimetype: 'image/jpeg',
        //       buffer: <Buffer ff d8 ff e1 54 ff 45 78 69 66 00 00 4d 4d 00 2a 00 00 00 08 00 0e 01 0f 00 02 00 00 00 08 00 00 00 b6 01 01 00 
        // 04 00 00 00 01 00 00 12 00 01 12 00 03 ... 6761045 more bytes>,
        //       size: 6761095
        //     }
        //   ],
        //   thumbnail: [
        //     {
        //       fieldname: 'thumbnail',
        //       originalname: 'IMG_20231015_172154.jpg',
        //       encoding: '7bit',
        //       mimetype: 'image/jpeg',
        //       buffer: <Buffer ff d8 ff e1 2c 9c 45 78 69 66 00 00 4d 4d 00 2a 00 00 00 08 00 0e 01 0f 00 02 00 00 00 08 00 00 00 b6 01 01 00 
        // 04 00 00 00 01 00 00 0d 80 01 12 00 03 ... 1979779 more bytes>,
        //       size: 1979829
        //     }
        //   ]
        // }



        if (!req.files.thumbnail || req.files.thumbnail.length == 0) {
            return res.json({
                "status": "false",
                "reason": "provide thumbnail img "
            })
        }
        if (!req.files.photos || req.files.photos.length == 0) {
            return res.json({
                "status": "false",
                "reason": "provide photos other than thumbnail "
            })
        }


        // then checl other all filed not null
        const { title, desc, technology } = req.body;
        if (!title || !desc) {
            return res.json({
                "status": "false",
                "reason": "send all field detail"
            })

        }


        if (technology.length == 0) {
            return res.json({
                "status": "false",
                "reason": "no technology entered"
            })
        }

        var list_of_photos_url = [];
        var list_of_thumbnail_url = [];
        try {
            list_of_photos_url = await upload_to_cloudinary(req.files.photos);
            list_of_thumbnail_url = await upload_to_cloudinary(req.files.thumbnail);
        } catch (error) {
            console.log(error);
        }


        if (list_of_photos_url.length == 0 || list_of_thumbnail_url.length == 0) {
           return res.json({ "status": "false", "error": "we failed to upload your imges try again" })
        }
        // get img  link and crete obj 
        const data = {
            title: title,
            desc: desc,
            thumbnail: list_of_thumbnail_url[0], //here in this list we have only 1 photo always.. beacuse we limit to upload 1 thumbnail..
            photos: list_of_photos_url,
            technology: technology
        };

        //save to db and send response
        const ans = await Project.create(data);

        // give response to the user
        return res.json({ "status": "true","res":ans })

    } catch (error) {
        console.log(error);
        return res.json({ error: error });
    }


}


export { getproject, addproject };