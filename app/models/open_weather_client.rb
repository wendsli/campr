class OpenWeatherClient

  def initialize (campground_zip)
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
      humidity: parsed_weather["main"]["humidity"]
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
