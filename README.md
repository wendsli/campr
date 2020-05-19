# README

[![Codeship Status for wendsli/campr](https://app.codeship.com/projects/664cba80-714a-0138-4ac2-2acdf287ecee/status?branch=master)](https://app.codeship.com/projects/395402)

# campr

campr is a Rails / React app that helps users plan their next camping trip.
Populated by user input and data scraped from the National Parks Service API,
campr integrates with the Google Maps JavaScript and OpenWeatherMap APIs to
provide the location, weather, and contact information for campgrounds added to
its PostgreSQL database. campr was built as a "Breakable Toy" or capstone
project for the Launch Academy full-stack web development bootcamp.

## Author
Wesley Davis

## Technologies & Versions
- [Ruby on Rails - 5.2.4.2](https://guides.rubyonrails.org/v5.2/)
- [React.js - 16.8.0](https://reactjs.org/docs/getting-started.html)
- [PostgreSQL - 12.1](https://www.postgresql.org/docs/12/index.html)


## APIs
- [Google Maps JavaScript](https://developers.google.com/maps/documentation/javascript/)
- [OpenWeatherMap](https://openweathermap.org/api)
- [National Parks Service](https://www.nps.gov/subjects/digital/nps-data-api.htm)

#### Set up `campr` locally
Please follow the steps below to get `campr` running locally:

```
git clone https://github.com/wendsli/campr
bundle exec bundle install
yarn install
bundle exec rake db:setup
```

#### API Key Usage & Storage
campr integrates with the OpenWeatherMap and Google Maps JavaScript APIs, so
you will need to register with those services (links above) to request and
configure the necessary API keys.

The OpenWeatherMap API key should be stored as an ENV variable to a `.env` file
and `.env` added to `.gitignore`.

Google allows you to leave your API key open but it's strongly advised that you
restrict it to specific websites and/or APIs. The Google key included in the
related code here, for instance, is restricted to the Maps JavaScript API and
the local and production addresses used to run the website.

###### Execute the test suite
```
bundle exec rspec
```

###### Run campr locally
To run campr locally on your machine run the following commands from the
project directory in separate terminal tabs:
```
rails s
yarn start
```
Navigate to <http://localhost:3000> in your browser.

*NOTE - an internet connection is needed for the map and weather components.*

###### What's next for campr?
campr is an ongoing project. Please check back for updates and see the
`Planned-Improvements.md` file in this repo for a prioritized list of upcoming
work.
