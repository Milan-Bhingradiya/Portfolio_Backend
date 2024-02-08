import express from "express";
import cors from "cors";
const app = express();

app.use(cors({origin:"*",credentials:true}));

app.use(express.json());



// routes imports
import projectRouter from './routes/project.route.js';
// route declare
app.use("/api/v1",projectRouter);

export {app};



