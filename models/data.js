const mongoose = require("mongoose");  
const Schema = mongoose.Schema;

const dataSchema = new Schema({  
    firstName: {
        type: String
    },

    lastName:{
        type: String
    },

    participation: {
        type: Number
    },
})
    


module.exports = mongoose.model("Data", dataSchema); 