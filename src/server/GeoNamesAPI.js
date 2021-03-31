import fetch from 'node-fetch'
export const baseUrl = `http://api.geonames.org/search?type=json&maxRows=3&username=${process.env.GEO_API_USER}&q=`

// latitude, longitude, country,
export async function searchFulltextForGeoInfo(searchTerm) {
    try {
        let response = await fetch(encodeURI(`${baseUrl}${searchTerm}`));
        let result = await response.json();
        let send = {}
        if (!result.totalResultsCount) {
            return {error: 1, reason: "GeoNames API did not return legal response. You might have your API key improperly configured."}
        }
        if (result.totalResultsCount === 0) {
            return {error: 1, reason: "GeoNames API returned no results."}
        }
        console.log(result.geonames[0])
        send.country = result.geonames[0].countryName
        send.lat = result.geonames[0].lat
        send.lng = result.geonames[0].lng
        return send;
    } catch (err) {
        console.log(err);
    }
}
