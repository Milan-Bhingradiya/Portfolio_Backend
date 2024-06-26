import { Project } from "../models/Project.models.js"
import { upload_to_cloudinary } from "../utils/cloudinary.js"


import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import NodeCache from "node-cache";
import { Contact } from "../models/Contact.models.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 10 day store cache ..
// const nodeCache= new NodeCache({stdTTL: 60*60*24*10});
// 10 min store cache..
// const nodeCache= new NodeCache({stdTTL: 60*10});
// 1 min store cache..
// const nodeCache= new NodeCache({stdTTL: 60});
// 10 sec store cache..
// const nodeCache= new NodeCache({stdTTL: 10});
// 1 sec store cache..
// const nodeCache= new NodeCache({stdTTL: 1});
// no store cache..
// const nodeCache= new NodeCache({stdTTL: 0});

// 10 day store cache ..
const nodeCache = new NodeCache({ stdTTL: 60 * 60 * 24 * 10 });

const getproject = async (req, res) => {
    console.log("get project call");
    try {
        let projects;
        if (nodeCache.has("projects")) {
            projects = JSON.parse(nodeCache.get("projects"));
        } else {
            projects = await Project.find();
            nodeCache.set("projects", JSON.stringify(projects))
        }
        return res.json({ "status": true, "projects": projects })

        // Find all projects

    } catch (error) {
        console.error("Error in retrieving projects:", error);
        return res.json({ "status": false, "error": error })
    }

}


const addproject = async (req, res) => {
    console.log("add project called");

    // console.log(req.file);
    // console.log(req.files);
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
        var { title, desc, technology } = req.body;

        if (!title || !desc) {
            return res.json({
                "status": "false",
                "reason": "send all field detail"
            })

        }
        // we get technology as "["react","flutter"]" so we did ["react","flutter"] using below..
        technology = JSON.parse(technology);

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

        // add this updated data in old cache..
        if (nodeCache.has("projects")) {
            let projects = JSON.parse(nodeCache.get("projects"));
            projects.push(ans);
            nodeCache.set("projects", JSON.stringify(projects));
        }

        // give response to the user
        return res.json({ "status": true, "data": ans })

    } catch (error) {
        console.log(error);
        return res.json({ error: error });
    }


}

const contactus = async (req, res) => {
    console.log("contact us call");
    try {
        var { name, email, subject,message } = req.body;

        
        if (!name || !email || !subject || !message) {
            return res.json({
                "status": "false",
                "reason": "send all field detail"
            })

        }

        const data = {
            name: name,
            email: email,
            subject: subject,
            message: message
        };

        //save to db and send response
        const ans = await Contact.create(data);

        return res.json({ "status": true, "data": ans })

        // Find all projects

    } catch (error) {
        return res.json({ "status": false, "error": error })
    }

}

export { getproject, addproject,contactus };