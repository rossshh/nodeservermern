const mongoose=require('mongoose');

const URI=process.env.MONGODB_URI;
const connectDB=async()=>{
    try {
        await mongoose.connect(URI);
        console.log("Mongo DB Connected✔️");

    } catch (error) {
        console.log("Database Connection Error");
        process.exit(0);
    }
}
module.exports=connectDB;