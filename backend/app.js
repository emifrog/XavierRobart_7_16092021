const express = require('express');
const bodyParser = require('body-parser'); // pour importer le package body parser

const app = express();


app.use(bodyParser.json()); // pour transformer le corps de la requête en objet JS
module.exports = app;