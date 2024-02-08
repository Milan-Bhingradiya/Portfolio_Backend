import { mongoose } from "mongoose";

const connect = async () => {

    try {
        const res = await mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log("mongodb connected ,connected port : ", res.connection.port);
    } catch (error) {
        console.log("error is connection db .", error);
    }
}

export default connect;

// (here code will execute){}