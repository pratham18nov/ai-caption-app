const mongoose = require('mongoose')

const saveCaptionSchema = new mongoose.Schema({
    caption:{
        type: String,
        required: true
    },
    likeCount:{
        type: Number,
        required: true 
    },
    tags:[{     //array with index
        type: String,
        index: true
    }]
}, {timestamps: true})

const saveCaptionsModel = mongoose.model("SaveCaptions", saveCaptionSchema)
module.exports = saveCaptionsModel