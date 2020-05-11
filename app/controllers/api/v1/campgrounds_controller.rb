class Api::V1::CampgroundsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Campground.all
  end

  def show
    render json: Campground.find(params[:id])
  end

  def create
    render json: {
      campground: Campground.where(website: params["website"]).first_or_create(campground_params)
    }
  end

  private

  def campground_params
    params.require(:campground).permit(
      :name, :street, :city, :state, :zip, :website, :phone, :image, :latitude,
        :longitude, :store, :firewood, :bathrooms, :showers, :utilities,
        :waste
    )
  end
end
