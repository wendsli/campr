require "rails_helper"

RSpec.describe Api::V1::CampgroundsController, type: :controller do
  describe "GET#index" do
    let!(:campground1) { Campground.create(
      name: "Minuteman Campground",
      street: "177 Littleton Rd",
      city: "Ayer",
      state: "MA",
      zip: "01432",
      website: "https://minutemancampground.com/",
      phone: "978-772-0042")
    }

    let!(:campground2) { Campground.create(
      name: "Lorraine Park Campground",
      street: "133 Jenkins Rd",
      city: "Andover",
      state: "MA",
      zip: "01810",
      website: "https://www.mass.gov/locations/harold-parker-state-forest",
      phone: "978-475-7972")
    }

    let!(:campground3) { Campground.create(
      name: "Test Campground",
      street: "133 Jenkins Rd",
      city: "Andover",
      state: "MA",
      zip: "01810",
      website: "https://www.testcampground.com/",
      phone: "978-475-7972")
    }

    it "returns a successful response status and a content type of json" do
      get :index

      expect(response.status).to eq 200
      expect(response.content_type).to eq 'application/json'
    end

    it "returns all campgrounds in the database" do
      get :index
      response_body = JSON.parse(response.body)

      expect(response_body.length).to eq 3

      expect(response_body[0]["name"]).to eq campground1.name
      expect(response_body[0]["street"]).to eq campground1.street
      expect(response_body[0]["city"]).to eq campground1.city
      expect(response_body[0]["state"]).to eq campground1.state
      expect(response_body[0]["zip"]).to eq campground1.zip
      expect(response_body[0]["website"]).to eq campground1.website
      expect(response_body[0]["phone"]).to eq campground1.phone

      expect(response_body[1]["name"]).to eq campground2.name
      expect(response_body[1]["street"]).to eq campground2.street
      expect(response_body[1]["city"]).to eq campground2.city
      expect(response_body[1]["state"]).to eq campground2.state
      expect(response_body[1]["zip"]).to eq campground2.zip
      expect(response_body[1]["website"]).to eq campground2.website
      expect(response_body[1]["phone"]).to eq campground2.phone

      expect(response_body[2]["name"]).to eq campground3.name
      expect(response_body[2]["street"]).to eq campground3.street
      expect(response_body[2]["city"]).to eq campground3.city
      expect(response_body[2]["state"]).to eq campground3.state
      expect(response_body[2]["zip"]).to eq campground3.zip
      expect(response_body[2]["website"]).to eq campground3.website
      expect(response_body[2]["phone"]).to eq campground3.phone
    end
  end

  describe "GET#show" do
    let!(:campground1) { Campground.create(
      name: "Minuteman Campground",
      street: "177 Littleton Rd",
      city: "Ayer",
      state: "MA",
      zip: "01432",
      website: "https://minutemancampground.com/",
      phone: "978-772-0042")
    }

    let!(:campground2) { Campground.create(
      name: "Lorraine Park Campground",
      street: "133 Jenkins Rd",
      city: "Andover",
      state: "MA",
      zip: "01810",
      website: "https://www.mass.gov/locations/harold-parker-state-forest",
      phone: "978-475-7972")
    }

    it "returns a successful response status and a content type of json" do
      VCR.use_cassette('campground_show_page_cassette') do
        get :show, params: {id: campground1.id}

        expect(response.status).to eq 200
        expect(response.content_type).to eq 'application/json'
      end
    end

    it "returns information for the specified campground" do
      VCR.use_cassette('campground_show_page_cassette') do
        get :show, params: {id: campground1.id}
        response_body = JSON.parse(response.body)

        expect(response_body.length).to eq 19

        expect(response_body["name"]).to eq campground1.name
        expect(response_body["website"]).to eq campground1.website
        expect(response_body["street"]).to eq campground1.street
        expect(response_body["city"]).to eq campground1.city
        expect(response_body["state"]).to eq campground1.state
        expect(response_body["zip"]).to eq campground1.zip
        expect(response_body["phone"]).to eq campground1.phone

        expect(response_body["name"]).to_not eq campground2.name
        expect(response_body["website"]).to_not eq campground2.website
        expect(response_body["phone"]).to_not eq campground2.phone
      end
    end
  end

  describe "POST#new" do
    let!(:campground1) { Campground.create(
      name: "Minuteman Campground",
      street: "177 Littleton Rd",
      city: "Ayer",
      state: "MA",
      zip: "01432",
      website: "https://minutemancampground.com/",
      phone: "978-772-0042",
      store: true,
      firewood: false,
      bathrooms: true,
      showers: false,
      utilities: false,
      waste: true
    ) }

    let!(:existing_campground) { { campground: {
      name: "Minuteman Campground",
      street: "177 Littleton Rd",
      city: "Ayer",
      state: "MA",
      zip: "01432",
      website: "https://minutemancampground.com/",
      phone: "978-772-0042",
      store: true,
      firewood: false,
      bathrooms: true,
      showers: false,
      utilities: false,
      waste: true
    } } }

    let!(:new_campground) { { campground: {
      name: "Lorraine Park Campground",
      street: "133 Jenkins Rd",
      city: "Andover",
      state: "MA",
      zip: "01810",
      website: "https://www.mass.gov/locations/harold-parker-state-forest",
      phone: "978-475-7972",
      store: false ,
      firewood: true,
      bathrooms: false,
      showers: true,
      utilities: true,
      waste: false
    } } }

    context "when the database contains a record matching the provided params" do
      it "fails to create a new record" do
        previous_count = Campground.count
        post :create, params: existing_campground
        new_count = Campground.count

        expect(new_count).to eq previous_count
      end

      it "returns the matching record as json" do
        post :create, params: existing_campground
        response_body = JSON.parse(response.body)

        expect(response_body.length).to eq 1
        expect(response_body["campground"].length).to eq 19
        expect(response_body["campground"]["id"]).to eq campground1.id
        expect(response_body["campground"]["name"]).to eq campground1.name
        expect(response_body["campground"]["street"]).to eq campground1.street
        expect(response_body["campground"]["city"]).to eq campground1.city
        expect(response_body["campground"]["state"]).to eq campground1.state
        expect(response_body["campground"]["zip"]).to eq campground1.zip
        expect(response_body["campground"]["website"]).to eq campground1.website
        expect(response_body["campground"]["phone"]).to eq campground1.phone
        expect(response_body["campground"]["store"]).to eq campground1.store
        expect(response_body["campground"]["firewood"]).to eq campground1.firewood
        expect(response_body["campground"]["bathrooms"]).to eq campground1.bathrooms
        expect(response_body["campground"]["showers"]).to eq campground1.showers
        expect(response_body["campground"]["utilities"]).to eq campground1.utilities
        expect(response_body["campground"]["waste"]).to eq campground1.waste
      end
    end

    context "when the database has no record matching the provided params" do
      it "creates a new Campground and returns the Campground as json" do

        previous_count = Campground.count
        post :create, params: new_campground, format: :json
        response_body = JSON.parse(response.body)
        new_count = Campground.count

        expect(new_count).to eq(previous_count + 1)
        expect(response_body["campground"].length).to eq 19
        expect(response_body["campground"]["name"]).to eq new_campground[:campground][:name]
        expect(response_body["campground"]["street"]).to eq new_campground[:campground][:street]
        expect(response_body["campground"]["city"]).to eq new_campground[:campground][:city]
        expect(response_body["campground"]["state"]).to eq new_campground[:campground][:state]
        expect(response_body["campground"]["zip"]).to eq new_campground[:campground][:zip]
        expect(response_body["campground"]["website"]).to eq new_campground[:campground][:website]
        expect(response_body["campground"]["phone"]).to eq new_campground[:campground][:phone]
        expect(response_body["campground"]["store"]).to eq new_campground[:campground][:store]
        expect(response_body["campground"]["firewood"]).to eq new_campground[:campground][:firewood]
        expect(response_body["campground"]["bathrooms"]).to eq new_campground[:campground][:bathrooms]
        expect(response_body["campground"]["showers"]).to eq new_campground[:campground][:showers]
        expect(response_body["campground"]["utilities"]).to eq new_campground[:campground][:utilities]
        expect(response_body["campground"]["waste"]).to eq new_campground[:campground][:waste]
      end
    end
  end

  describe "PATCH#update" do
    let!(:campground1) { Campground.create(
      name: "Minuteman Campground",
      street: "177 Littleton Rd",
      city: "Ayer",
      state: "MA",
      zip: "01432",
      website: "https://minutemancampground.com/",
      phone: "978-772-0042",
      store: true,
      firewood: true,
      bathrooms: true,
      showers: true,
      utilities: true,
      waste: true
    ) }

    it "does not add an additional campground to the db" do
      updated_campground = {
        id: campground1.id,
        name: "Minuteman Campground",
        street: "177 Littleton Rd",
        city: "Ayer",
        state: "MA",
        zip: "01432",
        website: "https://minutemancampground.com/",
        phone: "978-772-0042",
        store: false,
        firewood: false,
        bathrooms: false,
        showers: false,
        utilities: false,
        waste: false
      }

      VCR.use_cassette('campground_show_page_update_cassette') do
        previous_count = Campground.count

        patch :update, params: {
          id: campground1.id,
          name: "Minuteman Campground",
          street: "177 Littleton Rd",
          city: "Ayer",
          state: "MA",
          zip: "01432",
          website: "https://minutemancampground.com/",
          phone: "978-772-0042",
          store: false,
          firewood: false,
          bathrooms: false,
          showers: false,
          utilities: false,
          waste: false,
          campground: updated_campground
        }

        new_count = Campground.count

        expect(previous_count).to eq new_count
      end
    end

    it "returns the updated campground" do
      updated_campground = {
        id: campground1.id,
        name: "Minuteman Campground",
        street: "177 Littleton Rd",
        city: "Ayer",
        state: "MA",
        zip: "01432",
        website: "https://minutemancampground.com/",
        phone: "978-772-0042",
        store: false,
        firewood: false,
        bathrooms: false,
        showers: false,
        utilities: false,
        waste: false
      }

      VCR.use_cassette('campground_show_page_update_cassette') do
        patch :update, params: {
          id: campground1.id,
          name: "Minuteman Campground",
          street: "177 Littleton Rd",
          city: "Ayer",
          state: "MA",
          zip: "01432",
          website: "https://minutemancampground.com/",
          phone: "978-772-0042",
          store: false,
          firewood: false,
          bathrooms: false,
          showers: false,
          utilities: false,
          waste: false,
          campground: updated_campground
        }

        response_body = JSON.parse(response.body)

        expect(response_body.length).to eq 19

        expect(response_body["name"]).to eq updated_campground[:name]
        expect(response_body["street"]).to eq updated_campground[:street]
        expect(response_body["city"]).to eq updated_campground[:city]
        expect(response_body["state"]).to eq updated_campground[:state]
        expect(response_body["zip"]).to eq updated_campground[:zip]
        expect(response_body["website"]).to eq updated_campground[:website]
        expect(response_body["phone"]).to eq updated_campground[:phone]
        expect(response_body["store"]).to eq updated_campground[:store]
        expect(response_body["firewood"]).to eq updated_campground[:firewood]
        expect(response_body["bathrooms"]).to eq updated_campground[:bathrooms]
        expect(response_body["showers"]).to eq updated_campground[:showers]
        expect(response_body["utilities"]).to eq updated_campground[:utilities]
        expect(response_body["waste"]).to eq updated_campground[:waste]
      end
    end


    it "returns errors when validations aren't met" do
      incomplete_campground = {
        id: campground1.id,
        name: "",
        street: "177 Littleton Rd",
        city: "Ayer",
        state: "MA",
        zip: "",
        website: "minutemancampground.com/",
        phone: "978-772-0042",
        store: false,
        firewood: false,
        bathrooms: false,
        showers: false,
        utilities: false,
        waste: false
      }

      patch :update, params: { id: campground1.id, campground: incomplete_campground }

      response_body = JSON.parse(response.body)

      expect(response_body['errors']).to include "Name can't be blank"
      expect(response_body['errors']).to include "Zip can't be blank"
      expect(response_body['errors']).to include "Website is invalid"
    end
  end

  describe "DELETE#destroy" do
    let!(:campground1) { Campground.create(
      name: "Minuteman Campground",
      street: "177 Littleton Rd",
      city: "Ayer",
      state: "MA",
      zip: "01432",
      website: "https://minutemancampground.com/",
      phone: "978-772-0042",
      store: true,
      firewood: true,
      bathrooms: true,
      showers: true,
      utilities: true,
      waste: true
    ) }

    it "deletes the record from the database" do
      previous_count = Campground.count

      delete :destroy, params: { id: campground1.id }

      new_count = Campground.count

      expect(new_count).to eq(0)
      expect(new_count).to eq(previous_count - 1)
      expect(new_count).not_to eq(previous_count)
    end

    it "returns a status of 'no content'" do
      delete :destroy, params: { id: campground1.id }

      response_body = JSON.parse(response.body)

      expect(response.status).to eq 204
    end

    it "returns an empty object in the JSON response body" do
      delete :destroy, params: { id: campground1.id }

      response_body = JSON.parse(response.body)

      expect(response_body).to eq({})
    end
  end
end
