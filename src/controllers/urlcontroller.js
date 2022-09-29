const mongoose = require("mongoose")
const urlModel = require("../models/urlModel")
const { isValidBody, ValidUrl, isValid } = require("../validator/validator");
const shortid = require('shortid');
const validUrl = require('valid-url')



const urlShort = async (req, res) => {
    try {
        const data = req.body;

        //Validating request body
        if (!isValidBody(data))
            return res.status(400).send({ status: false, message: "Enter a valid input in body" });

        //validating longUrl
        if (!data.longUrl)
            return res.status(400).send({ status: false, message: "Please enter longUrl" });

        if (!isValid(data))
            return res.status(400).send({ status: false, message: "Enter a valid longUrl" });

        data.longUrl = data.longUrl.trim();

        if (!ValidUrl(data.longUrl))
            data.longUrl = "https://" + data.longUrl;

        let { longUrl } = data;

        if (!validUrl.isUri(data.longUrl))
            return res.status(400).send({ status: false, message: `'${longUrl}' is not a valid URL` });

        let checkLongUrl = await urlModel.findOne({ longUrl: longUrl })

        if (checkLongUrl) {
            return res.status(200).send({ status: true, data: checkLongUrl })
        }

        //creating urlCode
        let short = shortid.generate().toLowerCase();

        // //checking if urlCode is unique
        // if (await urlModel.findOne({ urlCode: short })) { short = shortid.generate().toLowerCase() }

        req.body.urlCode = short;
        req.body.shortUrl = "http://localhost:3000/" + short;

        let savedData = await urlModel.create(data);

        let allData = {
            longUrl: savedData.longUrl,
            shortUrl: savedData.shortUrl,
            urlCode: savedData.urlCode,
        };

        res.status(201).send({ status: true, data: allData });

    } catch (err) {
        res.status(500).send({ sattus: false, message: err.message });
    }
};


module.exports = { urlShort }