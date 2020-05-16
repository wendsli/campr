require 'rails_helper'

feature 'unauthenticated user tries accessing restricted pages', %Q{
  As an unauthenticated user
  I want to receive an error message when visiting restricted pages
  So that know how to access them
} do
  scenario 'unauthenticated user tries to access new campgrounds page' do
    user = FactoryBot.create(:user)

    visit campgrounds_new_path

    expect(page).to have_content('Please sign up or sign in to access this part of campr!')
    expect(page).to have_content('Log in')
    expect(page).to have_content('Sign Up')
    expect(page).to have_content('Sign In')
  end
end
