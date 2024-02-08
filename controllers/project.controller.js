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

        console.log("req.files");
        console.log(req.files);

        if (!req.files.thumbnail || req.files.thumbnail.length == 0) {
            return res.json({
                "status": "false",
                "reason": "provide thumbnailimg "
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

        // upload img photos to cloudniry and save url in list
        var list_of_photos_path = [];
        req.files.photos.map((fileobj) => {
            list_of_photos_path.push(path.join(__dirname, "..", "public", "project", "/") + fileobj.originalname);
        })

        // upload thumbnail to cloudniry and save url in list
        var list_of_thumbnail_path = [];
        req.files.thumbnail.map((fileobj) => {
            list_of_thumbnail_path.push(path.join(__dirname, "..", "public", "project", "/") + fileobj.originalname);
        })


        var list_of_photos_url = [];
        var list_of_thumbnail_url = [];
        try {

            list_of_photos_url = await upload_to_cloudinary(list_of_photos_path);
            list_of_thumbnail_url = await upload_to_cloudinary(list_of_thumbnail_path);
        } catch (error) {

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
        return res.json({ "status": ans })

    } catch (error) {
        console.log(error);
        return res.json({ error: error });
    }


}


export { getproject, addproject };