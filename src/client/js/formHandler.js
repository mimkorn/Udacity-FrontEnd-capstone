import {postData} from './postData'
import {differenceInCalendarDays, format} from 'date-fns'

function setInnerHtmlAt(elemId, value) {
    document.getElementById(elemId).innerHTML = value
}

function unhideFirstTimeHiddenTripStubText() {
    for (let elem of document.getElementsByClassName("invisible-before-first-search")) {
        elem.classList.remove("invisible-before-first-search")
    }
}

function handleSubmit(event) {
    event.preventDefault()
    if (!isFormInputValid()) {
        return
    }

    let cityFromFormInput = document.getElementById('city').value
    let departureDateFromFormInput = getDepartureDateFromForm()
    let daysBeforeDeparture = getCountdownValue()
    let tripLength = getTripLength()

    setInnerHtmlAt('days_before_departure', daysBeforeDeparture)
    setInnerHtmlAt('length_of_trip_in_days', tripLength)
    setInnerHtmlAt('destination_heading', cityFromFormInput)
    setInnerHtmlAt('departure_heading', departureDateFromFormInput)

    unhideFirstTimeHiddenTripStubText();

    postData(`http://localhost:8081/plan`, {city: cityFromFormInput, departureDate: departureDateFromFormInput})
        .then(function (res) {
            document.getElementById('trip_destination_image').src = `${res.pixabayResults.webformatURL}`
            setInnerHtmlAt('weather_intro', daysBeforeDeparture < 16 ? "Expected weather" : "Typical weather for that day is")
            setInnerHtmlAt('temperatures', prepareTemperatureInfo(res.weatherResults))
            let weatherIcon = document.getElementById('sky_info_image');
            let skyInfo = document.getElementById('sky_info');
            if (res.weatherResults.weather) {
                skyInfo.classList.remove("invisible")
                weatherIcon.classList.remove("invisible")
                weatherIcon.src = `https://www.weatherbit.io/static/img/icons/${res.weatherResults.weather.icon}.png`
                skyInfo.innerHTML = res.weatherResults.weather.description
            } else {
                skyInfo.classList.add("invisible")
                weatherIcon.classList.add("invisible")
            }
        })
}

/**
 * Counts the days between two dates, or a date and today. Accepts strings.
 * @param {*} laterDate
 * @param {*} sonnerDate optional, will fallback to today.
 * @returns number of days between.
 */
function getDaysBetween(laterDate, soonerDate = format(new Date(), "yyyy-MM-dd")) {
    return differenceInCalendarDays(new Date(laterDate), new Date(soonerDate));
}

function prepareTemperatureInfo(forecast) {
    return `High: ${forecast['high_temp'] ? forecast['high_temp'] : forecast['max_temp']} °C, Low: ${forecast['low_temp'] ? forecast['low_temp'] : forecast['min_temp']} °C`
}

function getDepartureDateFromForm() {
    return document.getElementById("departure").value;
}

function getReturnDateFromForm() {
    return document.getElementById("return").value;
}

function isFormInputValid() {

    function isValidDate(d) {
        let date = new Date(d)
        return date instanceof Date && !isNaN(date);
    }

    if (!document.getElementById('city').value) {
        alert("Seems like you didn't put any search term into the input field. Home sweet home.")
        return false
    }
    if (!isValidDate(getDepartureDateFromForm())) {
        alert("Departure date needs to be set to a valid value")
        return false
    }
    if (!isValidDate(getReturnDateFromForm())) {
        alert("Return date needs to be set to a valid value")
        return false
    }

    if (getCountdownValue() < 0) {
        alert("You've set departure date to the past. It's great to revisit memories. For planner, please input future date.")
        return false
    }

    if (getTripLength() < 0) {
        alert("You can't come back before you leave. Please set return date further into future than departure date.")
        return false
    }
    return true
}

function getCountdownValue() {
    return getDaysBetween(getDepartureDateFromForm())
}

function getTripLength() {
    return getDaysBetween(getReturnDateFromForm(), getDepartureDateFromForm()) + 1;
}

export {handleSubmit}
