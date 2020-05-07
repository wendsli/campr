class Api::V1::CampgroundsController < ApplicationController
  def index
    render json: Campground.all
  end

  def show
    render json: Campground.find(params[:id])
  end
end
