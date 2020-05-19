# Planned Improvements to campr
This file contains a prioritized list of planned improvements and ongoing work
on campr features.

### 1. Testing 3rd-party API calls via VCR gem
Given time constraints building an MVP version of campr during Launch Academy's
two-week "Breakable Toy" timeline, work to implement a more comprehensive test
suite for the 3rd-party API calls campr makes is actively ongoing.

Currently, the campground "show" page displays map and weather data via live
calls to the Google Maps and OpenWeatherMap APIs -- see relevant code below. To
prevent testing from triggering live 3rd-party API calls, tests for the page
and related functionality have been marked as "pending" in the test suite.

Incorporating the VCR gem will facilitate these tests without live API calls
and is the top priority for improving the campr codebase.

[VCR Gem GitHub Repo](https://github.com/vcr/vcr)

Relevant code from the campr codebase:

```javascript
// CampgroundShowPageContainer.js <- excerpt related to 3rd-party API call
if (campground) {
  if (campground.latitude && campground.longitude) {
    mapTile = <CampgroundShowMapTile
    latitude={campground.latitude}
    longitude={campground.longitude}
    isMarkerShown={true}
    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDOBSMrSGGkPkNlhDdTAKwM55ZNsght8Yg&v=3.exp&libraries=geometry,drawing,places"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `300px` }} />}
    mapElement={<div style={{ height: `100%`}} />}
    />
  } else {
    mapTile = "Loading campground area map..."
  };
};
```

```ruby
#CampgroundShowSerializer.rb
class Api::V1::CampgroundShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :street, :city, :state, :zip, :website, :phone,
    :image, :latitude, :longitude, :store, :firewood, :bathrooms,
    :showers, :utilities, :waste, :user, :weather

  def user
    if scope
      {id: scope.id, userName: scope.user_name, admin: scope.admin }
    else
      {id: nil, userName: nil, admin: nil }
    end
  end

  def weather
    client = OpenWeatherClient.new(object.zip)
    weather = client.format_weather_api_response

    return weather
  end
end

```

```ruby
#OpenWeatherClient.rb
class OpenWeatherClient

  def initialize(campground_zip)
    @campground_zip = campground_zip
  end

  def format_weather_api_response
    parsed_weather = parse_weather_api_response

    return {
      conditions: parsed_weather["weather"][0]["main"],
      icon: parsed_weather["weather"][0]["icon"],
      temp: parsed_weather["main"]["temp"],
      low: parsed_weather["main"]["temp_min"],
      high: parsed_weather["main"]["temp_max"],
      humidity: parsed_weather["main"]["humidity"],
      date: Time.at(parsed_weather["dt"]).strftime("%a %d %b"),
      location: parsed_weather["name"],
      description: parsed_weather["weather"][0]["description"],
      wind: parsed_weather["wind"]["speed"]
    }
  end

  private

  def fetch_weather_by_zip
    domain = "https://api.openweathermap.org/data/2.5/"
    query = "weather?zip=#{@campground_zip}&appid=#{ENV["OPEN_WEATHER_API_KEY"]}"
    url = domain + query

    weather_api_response = Faraday.get(url)

    return weather_api_response
  end

  def parse_weather_api_response
    weather_response_body = fetch_weather_by_zip.body
    parsed_weather_json = JSON.parse(weather_response_body)

    return parsed_weather_json
  end
end
```

*NOTE - improving the test suite will also be a good opportunity to revisit the
code involved and plan potential refactors.*

### 2. Internal and external search via NPS and/or Google Places APIs
Building search functionality for the local database and 3rd-party APIs would
both improve user experience, as well as allow for either A) improving the way
data is entered, validated, and collected when users want to add campgrounds to
the database, or B) making it possible to display campground data based purely
on those 3rd-party API calls.

*NOTE -- making this the method by which users populate the "add a campground"
form would potentially replace for some of the form validations noted in "3"
below.*

### 3. Form and model validation restrictions
Validations for the campground model and the form that lets users add
campgrounds to the site and database, and improving these validations will
help ensure stronger data fidelity and site functionality.

For instance, zip codes are used to populate campground weather data but the
form does not currently validate the inputted values against real zip codes.
Entering non-existent zip codes can cause errors with the resulting campground
information display, which itself offers another opportunity for refactoring.

Planned validations:
- [ ] Zip codes -- length and existence of matching zipcode
- [ ] Longitude & Lattitude -- numericality and length
- [ ] Phone numbers -- length and, ideally, visual formatting
- [ ] Website -- stripping "http" and "https" when running duplication checks

### 4. Building campground reviews feature
One of the main goals for the site is building a community of camping
enthusiasts, and every community needs communication. Reviews would provide a
way for users to share information, as well as the opportunity to implement
additional CRUD methods and authorization checks.

#### Miscellaneous
- [ ] Data seeding via rest-client gem
- [ ] Allowing users to "favorite" and/or "wish-list" campgrounds
- [ ] Displaying weather data on campgrounds "index" page

### Completed Improvements
