import { mongoose } from "mongoose";


const projectSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    imgurl: [{
        type: String,
    }],
    technology: [{
        type: String,
    }]
    

});


export const Project = mongoose.model('Project', projectSchema);