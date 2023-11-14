const mongoose = require("mongoose");


export const mongoConnect = async () => {
    return await mongoose.connect(process.env.MONGO_URI.replace('<password>', encodeURIComponent(process.env.MONGO_PASSWORD)), {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

const urlSchema = new mongoose.Schema({
    original_url: String,
    short_url: String
})

export const UrlsModel = mongoose.model('urls', urlSchema, 'short_urls')
