import fetch from 'node-fetch'
import { differenceInCalendarDays, format } from 'date-fns'


const forecast16daysApi = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}`
const climateNormalsApi = `https://api.weatherbit.io/v2.0/normals?key=${process.env.WEATHERBIT_API_KEY}`

export async function getWeatherFor(lat, lon, departureDate) {

    let pickedApi = prepareApiBasedOnDepartureDate(departureDate)
    try {
        let response = await fetch(encodeURI(`${pickedApi}&lat=${lat}&lon=${lon}`));
        let result = await response.json();
        let forecast = result.data.find(forecast => {
            return !forecast.valid_date || forecast.valid_date == departureDate
        })
        // if (result.totalResultsCount == 0) {
        //     return { error: 1, reason: "GeoNames API returned no results." }
        // }
        return forecast;
    } catch (err) {
        console.log(err);
    }
}

function prepareApiBasedOnDepartureDate(departureDate) {
    let tripCountdown = differenceInCalendarDays(new Date(departureDate), new Date())
    if (tripCountdown < 16) return forecast16daysApi
    else {
        let dayAndMonthOfForecast = format(new Date(departureDate), "MM-dd")
        return `${climateNormalsApi}&start_day=${dayAndMonthOfForecast}&end_day=${dayAndMonthOfForecast}`
    }
}