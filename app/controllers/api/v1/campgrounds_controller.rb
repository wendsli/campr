class Api::V1::CampgroundsController < ApplicationController
  def index
    render json: Campground.all
  end
end
