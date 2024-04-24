import express from "express";
import cors from "cors";
import userRouter from './routes/user.route.js';
import  adminRouter  from "./routes/admin.route.js";
const app = express();

app.use(cors({
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}));

app.use(express.json());



// routes imports
// route declare
app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",adminRouter);

export {app};



