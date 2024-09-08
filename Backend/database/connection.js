const mongoose = require("mongoose")

const connection = async (USERNAME,PASSWORD) =>{
    try{
        USERNAME=encodeURIComponent(USERNAME)
        PASSWORD=encodeURIComponent(PASSWORD)
        const URL=`mongodb+srv://${USERNAME}:${PASSWORD}@pocketnotescluter.vnhu2ba.mongodb.net/?retryWrites=true&w=majority&appName=pocketNotesCluter`
        await mongoose.connect(URL);
        console.log("Connection Build");
    }catch(error){
        console.log("error",error)
    }
}

module.exports = connection