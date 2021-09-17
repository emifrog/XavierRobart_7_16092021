const express = require('express');
const bodyParser = require('body-parser'); // aide à analyser la demande et à créer l' req.bodyobjet

const app = express();
const cors = require('cors')  //fournit un middleware Express pour activer CORS avec diverses options

db.sequelize.sync()

app.use(cors())
app.use(bodyParser.json()); // pour transformer le corps de la requête en objet JS
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;