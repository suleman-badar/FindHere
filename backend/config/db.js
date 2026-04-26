import mongoose from "mongoose";
import dns from "node:dns/promises";
// console.log("Before setting: Current DNS servers:", dns.getServers());
// [ '127.0.0.1' ]
dns.setServers(["1.1.1.1"]);

// console.log("After setting: Current DNS servers:", dns.getServers());

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        // const conn = await mongoose.connect("mongodb://127.0.0.1:27017/findhere");

        console.log(`MongoDB Connected: for second time ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;