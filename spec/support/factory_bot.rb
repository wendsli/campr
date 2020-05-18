require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:user_name) {|n| "user#{n}"}
    sequence(:email) {|n| "user#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }
  end

  factory :admin do
    sequence(:user_name) {|n| "user#{n}"}
    sequence(:email) {|n| "user#{n}@example.com" }
    admin { true }
    password { 'password' }
    password_confirmation { 'password' }
  end
end
