import express from "express";
import cors from "cors";
import projectRouter from './routes/project.route.js';
const app = express();

app.use(cors({origin:"*",credentials:true}));

app.use(express.json());



// routes imports
// route declare
app.use("/api/v1",projectRouter);



export {app};



