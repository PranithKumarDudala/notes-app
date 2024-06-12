const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    key : {
        type : String,
        required : true
    }

})

const Notes = mongoose.model("Notes", schema)

module.exports = Notes