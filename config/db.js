import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/BookDb"

const connectDb = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("DataBase Connected Succesfully !!");
        })

        await mongoose.connect(MONGO_URI)
    } catch (error) {
        console.log(error);
    }
}
export default connectDb