require 'rails_helper'

feature 'unauthenticated user visits unrestricted pages', %Q{
  As an unauthenticated user
  I want to access unrestricted site pages without errors
  So that I can user the site
} do
  scenario 'unauthenticated user tries to access campgrounds index page' do
    user = FactoryBot.create(:user)

    visit campgrounds_path

    expect(page).to have_content('Sign Up')
    expect(page).to have_content('Sign In')
    expect(page).not_to have_content('Please sign up or sign in to access this part of campr!')
  end
end
