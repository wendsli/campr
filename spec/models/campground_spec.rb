require "spec_helper"

RSpec.describe Campground, type: :model do
  it { should have_valid(:name).when("Campground1") }
  it { should_not have_valid(:name).when(nil, "") }

  it { should have_valid(:website).when("http://www.campground2.com") }
  it { should have_valid(:website).when("https://www.campground2.com") }
  it { should_not have_valid(:website).when("www.campground2.com") }
  it { should_not have_valid(:website).when(nil, "") }
end
