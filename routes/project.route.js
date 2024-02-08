
import { Router } from "express";
import { getproject, addproject} from "../controllers/project.controller.js";


import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'E:/project/NextJs_project/Potfolio_Backend/public/project')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null,  file.originalname)
    }
})

const upload = multer({ storage: storage });

const router = Router();


try {
// dp is same as from client side key-img key is dp..
    router.route("/getproject").post(upload.single('dp'), getproject);
    router.route("/addproject").post(upload.array("dp",10),addproject);
} catch (error) {

}




export default router;