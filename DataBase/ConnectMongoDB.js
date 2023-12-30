import mongoose from "mongoose";

const uri =
    "mongodb+srv://bwinvit:xHRtpuSaSGblQmMj@registerjwt.1krjr1m.mongodb.net/?retryWrites=true&w=majority";

export const ConnectMongoDB = () => {
    try {
        mongoose
            .connect(uri)
            .then(() => console.log("MongoDB connected"))
    } catch (err) {
        console.log(err);
    }
};
