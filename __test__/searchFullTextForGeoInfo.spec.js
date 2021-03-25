import { getSentiment } from '../src/server/GeoNamesAPI'
import fetch from 'node-fetch'

jest.mock('node-fetch')

test("test correctness of url call with data", async () => {
    searchFulltextForGeoInfo("Paris");
    expect(fetch).toHaveBeenCalledWith("http://api.geonames.org/search?type=json&maxRows=3&username=undefined&q=Paris")
})
