import fetch from 'node-fetch'
import { differenceInCalendarDays, format, getMonth, getDate } from 'date-fns'

const baseApi = `https://pixabay.com/api/?`

export async function fetchSomeImageForEither(location, country) {
    let result = await getAPicFor(location);
    if (!result) result = await getAPicFor(country + " flag");
    return result;
}

async function getAPicFor(location) {

    let urlParams = new URLSearchParams({
        q: location,
        key: process.env.PIXABAY_API_KEY,
        image_type: 'photo',
        category: 'places'
    })
    try {
        console.log(baseApi + urlParams.toString())
        let response = await fetch(baseApi + urlParams.toString())
        let result = await response.json();
        if (parseInt(result.totalHits) > 0)
            return result.hits[0]
        else
            console.log('No hits')
            return null;
    } catch (err) {
        console.log(err);
    }
}
