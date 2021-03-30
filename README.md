# Travel App as capstone project for Udacity's FrontEnd nanodegree

![Example screenshot](./src/client/media/Screenshot.png)

## Used APIs
- https://www.geonames.org/
- https://www.weatherbit.io/
- https://pixabay.com/

## Practiced knowledge
This project incorporates a bit of everything learnt in the Udacity FrontEnd Nanodegree course. You can get a quick understanding of what was covered in the contents of this course on the official pages of [Front End Web Developer Udacity's Nanodegree program](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd0011)

Mostly:
- CSS & Website Layout
- JavaScript and the DOM
- Web APIs and Asynchronous Applications
- Build Tools, Webpack, and Service Worker

Each of these were practiced in separate projects and this project practiced all four in a single capstone project.

## Info for Udacity reviewer

### Additional tasks that'd been implemented
- trip length
- showing weather icon, when trip is within 16-days
- pulling in image of country if no picture is found for the city (try e.g. with "Poprad")

### Differences
- The requirement to show current weather for upcoming trips and weather in 16 days for trips that are in two months etc. didn't make sense. I instead implemented showing weather for the correct date within 16 days ([due to weatherbit restrictions](https://www.weatherbit.io/api/weather-forecast-16-day)) and show typical weather for any date beyond that based on [weatherBit Normals](https://www.weatherbit.io/api/climate-normals)
  - This is a frequently asked question about the rubric in the knowledge center, I'm [not the first who was confused](https://knowledge.udacity.com/questions/189431) and decided to use an approach that mirrors weather data that are more representative of the selected date.
- I put the logic fetching info from different APIs on the server side to avoid publishing my own API keys. Please use your own keys as in project 3/4. Simply provide and .env file in the root of the project with this content:
```
GEO_API_USER=******
WEATHERBIT_API_KEY=******
PIXABAY_API_KEY=******
```




