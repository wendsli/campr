class Campground < ApplicationRecord
  validates :name, presence: true
  validates :street, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :zip, presence: true
  validates :url, presence: true, uniqueness: true, format: { with: /http:\/\/|https:\/\// }
end
