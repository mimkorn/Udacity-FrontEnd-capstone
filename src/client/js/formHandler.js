import { postData } from './postData'

function handleSubmit(event) {
    event.preventDefault()

    let formText = document.getElementById('city').value
    if (!formText){
        alert("Seems like you didn't put any search term into the input field. Home sweet home.")
        return;
    }
    postData(`http://localhost:8081/plan`, {body : formText})
    .then(function(res) {
        console.log(res)
        document.getElementById('entryHolder').innerHTML = ""
        document.getElementById('entryHolder').appendChild(generateListOfAttributes(res))
    })
}

function generateListOfAttributes(data) {
    let items = document.createElement("ul")
    addDataPoint(items, "country", data)
    addDataPoint(items, "lat", data)
    addDataPoint(items, "lng", data)
    return items;
}

function addDataPoint(list, attribute, data){
    let dataPoint = list.appendChild(document.createElement("li"));
    dataPoint.innerHTML = `${attribute} is ${data[attribute]}`;
}
export { handleSubmit }
