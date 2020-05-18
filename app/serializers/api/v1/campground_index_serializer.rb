class Api::V1::CampgroundIndexSerializer < ActiveModel::Serializer
  attributes :id, :name, :street, :city, :state, :zip, :website, :phone,
    :image, :latitude, :longitude, :store, :firewood, :bathrooms,
    :showers, :utilities, :waste, :user

  def user
    if scope
      {id: scope.id, userName: scope.user_name, admin: scope.admin }
    else
      {id: nil, userName: nil, admin: nil }
    end
  end
end
