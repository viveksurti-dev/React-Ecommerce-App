const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
        // unique: true
    },
    slug: {
        type: String,
        lowercase: true
    }

})

const catagory = new mongoose.model('category', categorySchema);
module.exports = catagory;
