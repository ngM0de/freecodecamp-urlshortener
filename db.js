const mongoose = require("mongoose");


const mongoConnect = async () => {
    return await mongoose.connect(process.env.MONGO_URI.replace('<password>', encodeURIComponent(process.env.MONGO_PASSWORD)), {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

const urlSchema = new mongoose.Schema({
    original_url: String,
    short_url: String
})

const UrlsModel = mongoose.model('urls', urlSchema, 'short_urls')
module.exports = {mongoConnect, urlSchema, UrlsModel}