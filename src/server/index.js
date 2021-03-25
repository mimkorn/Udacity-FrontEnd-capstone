const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
dotenv.config();

const geoNamesAPI = require('./GeoNamesAPI.js')

var path = require('path')

const app = express()
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(cors());
app.use(express.static('dist'))
app.options('*', cors())

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})

app.post('/plan', async function(req, res) {
    let result = await geoNamesAPI.searchFulltextForGeoInfo(req.body.body)
    res.send(result)
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

