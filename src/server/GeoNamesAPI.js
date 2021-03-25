import fetch from 'node-fetch'
//TODO try removing export keyword at the baseURL
export const baseUrl = `http://api.geonames.org/search?type=json&maxRows=3&username=${process.env.GEO_API_USER}&q=`

// latitude, longitude, country,
export async function searchFulltextForGeoInfo(searchTerm) {
    try {
        let response = await fetch(`${baseUrl}${searchTerm}`);
        let result = await response.json();
        let send = {}
        if (result.totalResultsCount == 0) {
            return {error: 1, reason: "GeoNames API returned no results."}
        }
        send.country = result.geonames[0].countryName
        send.lat = result.geonames[0].lat
        send.lng = result.geonames[0].lng
        return result;
    } catch (err) {
        console.log(err);
    }
}
