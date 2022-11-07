const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    }
},{timestamps:true})

mongoose.model('Post',postSchema)//nazvanie modeli, object