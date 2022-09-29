const express = require('express');
const Router = express.Router();
const urlcon=require("../controllers/urlcontroller")

Router.post("/shorturl",urlcon.url)

















module.exports = Router;