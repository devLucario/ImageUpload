const mongoose = require("mongoose")

const mangaSchema =mongoose.Schema({
    MangaName : {
        type : String,
        required : true
    },
    Chapters: {
        type: Array,
        required : true
    }
})
mangaModel = mongoose.model("mangaModel",mangaSchema)
module.exports = mangaModel
