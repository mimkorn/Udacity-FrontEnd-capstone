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

## Installation / usage

1. Clone repo
2. Run `npm i` in the cloned project
3. As mentioned at the bottom of Readme, create an `.env` file with API keys (reviewer — use provided keys sent in the review comment of project submission), or preferably register in the above API services and use your own keys. 
4. To run in 
    1. the production environment
        1. build and run express server with `npm start buildnrun`. This will build the project into the dist folder and run the server from there. 
        2. Go to `localhost:8081` and the page should load. If you already had something running on port `8081`, kill it, or change the port in `./src/client/js/formhandler.js` and  in `./src/server/index.js` to a different port.
    2. the development environment
        1. build and run express server with `npm start buildnrun`. This will build the project into the dist folder and run the server from there.
        2. run `npm run build-dev` (for this you'll need to have port `8082` free. Or change the port in `./webpack.dev.js`)
        3. Go to  `localhost:8082`. This will serve you the client side from dev-server, so you can make changes to code and have them reflected after refresh. Beware, due to service workers present in codebase, you might need to force refresh to load the dev-served uncached website (⌘⇧R on Mac, Ctrl⇧R elsewhere)

    

## Info for Udacity reviewer

### Additional tasks that'd been implemented
- trip length
- showing weather icon, when trip is within 16-days
- pulling in image of country if no picture is found for the city (try e.g. with "Poprad")

### Differences
- The requirement to show current weather for upcoming trips and weather in 16 days for trips that are in two months etc. didn't make sense. I instead implemented showing weather for the correct date within 16 days ([due to weatherbit restrictions](https://www.weatherbit.io/api/weather-forecast-16-day)) and show typical weather for any date beyond that based on [weatherBit Normals](https://www.weatherbit.io/api/climate-normals)
  - This is a frequently asked question about the rubric in the knowledge center, I'm [not the first who was confused](https://knowledge.udacity.com/questions/189431) and decided to use an approach that mirrors weather data that are more representative of the selected date.
- I put the logic fetching info from different APIs on the server side to avoid publishing my own API keys. 
- Previous reviewers refused using their own keys as in project 3/4. The last reviewer requested I put it on Git. Since GeoNames API does not have a proper API key, but the username is used as a pseudo API key, I understandably do not want to put it in Git — anyone could read it from the history. For this reason I'll send the keys into the review submission comment, please simply create an .env file in the root of the project with the keys I'll send you in the comment. It will look something like this:
```
GEO_API_USER=******
WEATHERBIT_API_KEY=******
PIXABAY_API_KEY=******
```




