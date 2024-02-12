import express from "express";
import cors from "cors";
import projectRouter from './routes/project.route.js';
import  authrouter  from "./routes/auth.router.js";
const app = express();

app.use(cors({
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}));

app.use(express.json());



// routes imports
// route declare
app.use("/api/v1",projectRouter);
app.use("/api/v1",authrouter);

export {app};



