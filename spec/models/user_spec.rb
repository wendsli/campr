require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_valid(:user_name).when("User Name") }
  it { should_not have_valid(:user_name).when(nil, "") }
  it { should have_valid(:email).when("email@test.com") }
  it { should_not have_valid(:email).when(nil, "") }
  it { should have_valid(:password).when("password") }
  it { should_not have_valid(:password).when(nil, "") }
  it { should have_valid(:admin).when(true, false) }
end
