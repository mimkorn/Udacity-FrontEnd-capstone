const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
dotenv.config();

const geoNamesAPI = require('./GeoNamesAPI.js')
const weatherBitsAPI = require('./WeatherBitsAPI.js')
const pixabayAPI = require('./PixabayAPI.js')

const path = require('path')

const app = express()
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(cors());
app.use(express.static('dist'))
app.options('*', cors())

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})

app.post('/plan', async function(req, res) {
    let results = {}
    let geoResults = await geoNamesAPI.searchFulltextForGeoInfo(req.body.city)
    let weatherResults = await weatherBitsAPI.getWeatherFor(geoResults.lat, geoResults.lng, req.body.departureDate)
    let pixabayResults = await pixabayAPI.fetchSomeImageForEither(req.body.city, geoResults.country)
    results.weatherResults = weatherResults;
    results.pixabayResults = pixabayResults;
    res.send(results)
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

