const mongoose = require("mongoose")


const schema = new mongoose.Schema({
    title : {
        type : String,
        
    },
    key : {
        type : String,
        
    }

})

const Schema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    NotesList : [schema]
}, {versionKey : false})

const Users = mongoose.model("Users", Schema)

module.exports = Users;