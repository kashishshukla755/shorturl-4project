//const Model = require("../Models/urlModel")
const shortId = require("shortid")
const urlModel = require("../Models/urlModel")
const validUrl = require("valid-url")




const url = async function (req, res) {
    try {
        let data = req.body.longUrl
        //create url code
        data = shortId.generate()

        console.log(data)
        // check long url
        

        

        if (validUrl.isUri(data)) {
            console.log('Looks like an URI');
        }
        else {
            console.log('Not a URI');
        }

        const savedData = await urlModel.create(data);


        return res
            .status(201)
            .send({ status: true, message: "Sucessfully created", data: savedData
        });

    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

module.exports = { url }