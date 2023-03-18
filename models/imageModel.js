const mongoose = require("mongoose")

const imageSchema =mongoose.Schema({
    name: {
        type: String
        // required : true
    },
    image : {
        data :  Buffer,
        contentType : String,
        path : String
    }
    // image : String
})
imageModel = mongoose.model("imageModel",imageSchema)
module.exports = imageModel
