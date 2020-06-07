class Api::V1::CampgroundsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Campground.all, each_serializer: Api::V1::CampgroundIndexSerializer
  end

  def show
    render json: Campground.find(params[:id]), serializer: Api::V1::CampgroundShowSerializer
  end

  def create
    render json: {
      campground: Campground.where(
        website: params["campground"]["website"]
      ).first_or_create!(campground_params)
    }
  end

  def update
    updated_campground = Campground.find(params[:id])
    binding.pry
    if updated_campground.update(campground_params)
      render json: updated_campground, serializer: Api::V1::CampgroundShowSerializer
    else
      render json: { errors: updated_review.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
  end

  def destroy
    campground = Campground.find(params[:id])
    campground.destroy

    render json: {}, status: :no_content
  end

  private

  def campground_params
    params.require(:campground).permit(
      :name, :street, :city, :state, :zip, :website, :phone, :image, :latitude,
      :longitude, :store, :firewood, :bathrooms, :showers, :utilities, :waste,
      :user, :weather, :campground
    )
  end
end
