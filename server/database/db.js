
const mongoose = require('mongoose');
require('dotenv').config()


const connection = async (URL)=>  {
    
    try {
        await mongoose.connect(URL, { useNewUrlParser: true });
        console.log("DB connected")
        // console.log("URL: ", process.env.SERVER_URL, process.env.JWT_SECRET)
    }
    catch(e) {
        console.log(e)
    }
}


module.exports = connection;
