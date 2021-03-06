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
