const mongoose=require('mongoose');
const URI=process.env.MONGOOSE_URI;
const connectToDB=async()=>{
    try {
        await mongoose.connect(URI, {
            dbName: "TaskTracker",
        })    
        console.log("Connected to db")          
    } catch (error) {
        console.log(error);                
    }
}

module.exports=connectToDB;

