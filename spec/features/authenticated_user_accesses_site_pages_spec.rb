require 'rails_helper'

feature 'authenticated user visits restricted pages on the site', %Q{
  As an unauthenticated user
  I want to access unrestricted site pages without errors
  So that I can user the site
} do
  scenario 'authenticated user tries to access new campground form page' do
    user = FactoryBot.create(:user)

    visit new_user_session_path

    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password

    click_button 'Log in'

    visit campgrounds_new_path

    expect(page).not_to have_content('Please sign up or sign in to access this part of campr!')
  end
end
