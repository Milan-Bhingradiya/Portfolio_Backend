
import { Router } from "express";
import { getproject, addproject, contactus } from "../controllers/project.controller.js";


import multer from "multer";

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// for stpring in local disk..
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, "..", "public/project/"))
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.originalname)
//     }
// })
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();

try {
    // dp is same as from client side key-img key is dp..
    const op = upload.fields([{ name: "photos", maxCount: 10 }, { name: "thumbnail", maxCount: 1 }]);
    router.route("/getprojects").get(getproject);
    router.route("/addproject").post(op, addproject);
    router.route("/contactus").post(contactus)
} catch (error) {
    console.log(error);

}

export default router;