import { Project } from "../models/Project.models.js"


import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getproject = (req, res) => {

    const fileName = req.file;

    return res.json({ "project": req.file })
}


import { upload_to_cloudinary } from "../utils/cloudinary.js"
const addproject = async (req, res) => {
    try {

        console.log(req.files);

        if (!req.files || req.files.length == 0) {
            return res.json({
                "status": "false",
                "reason": "img not recived"
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

        // upload img 


        var list_of_imgpath = [];
        req.files.map((fileobj) => {
            list_of_imgpath.push("E:\\project\\NextJs_project\\Potfolio_Backend\\public\\project\\" + fileobj.originalname);
        })

        const filename = req.files.originalname;
        const imgurl = await upload_to_cloudinary(
            list_of_imgpath
        )

        console.log(imgurl);
        console.log(imgurl);



        // get img  link and crete obj 

        const data = {
            title: title,
            desc: desc,
            imgurl: imgurl,
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