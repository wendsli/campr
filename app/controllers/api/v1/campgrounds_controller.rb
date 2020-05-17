class Api::V1::CampgroundsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Campground.all
  end

  def show
    campground = Campground.find(params[:id])
    client = OpenWeatherClient.new(campground.zip)
    weather = client.format_weather_api_response

    render json: { campground: campground, weather: weather }
  end

  def create

    render json: {
      campground: Campground.where(
        website: params["campground"]["website"]
      ).first_or_create!(campground_params)
    }
  end

  private

  def campground_params
    params.require(:campground).permit(
      :name, :street, :city, :state, :zip, :website, :phone, :image, :latitude,
      :longitude, :store, :firewood, :bathrooms, :showers, :utilities, :waste
    )
  end
end
