class Api::V1::CampgroundsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Campground.all
  end

  def show
    render json: Campground.find(params[:id])
  end

  def create
    campground = Campground.new(campground_params)
    if campground.save
      render json: { campground: campground }
    else
      render json: { error: campground.errors.full_messages }, status:
        :unprocessable_entity
    end
  end

  private

  def campground_params
    params.require(:campground).permit(
      :name, :street, :city, :state, :zip, :website, :phone, :image, :latitude,
        :longitude, :store, :firewood, :bathrooms, :showers, :utilities,
        :waste_disposal
    )
  end
end
