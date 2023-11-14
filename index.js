import dotenv from "dotenv"
import express from "express";
import cors from "cors"
import shortId from 'shortid'
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser'
import {mongoConnect, UrlsModel} from "./db.js";
import urlValidator from "valid-url"

dotenv.config()


mongoConnect().then().catch(console.log)

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(cookieParser())
app.use(bodyParser.urlencoded())

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
    res.json({greeting: 'hello API'});
});

app.post('/api/shorturl', (req, res) => {
    const isUrlValid = urlValidator.isHttpUri(req.body.url) || urlValidator.isHttpsUri(req.body.url);
    if (isUrlValid) {
        const response = {original_url: req.body.url, short_url: shortId.generate()}
        const payload = new UrlsModel(response)
        payload.save().then(queryResult => {
            res.json(response)
        }).catch(queryResult => {
            res.json(queryResult)
        })
    } else {
        res.json({error: "invalid url"})
    }


})

app.get('/api/shorturl/:shorturl', (req, res) => {
    UrlsModel.findOne({short_url: req.params.shorturl}).then(queryResult => {
        res.redirect(queryResult.original_url);
    }).catch(queryResult => {
        res.json(queryResult)
    })

})

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});
