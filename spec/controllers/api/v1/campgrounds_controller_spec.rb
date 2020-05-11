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
      name: "Lorraine Park Campground",
      street: "133 Jenkins Rd",
      city: "Andover",
      state: "MA",
      zip: "01810",
      website: "https://www.mass.gov/locations/harold-parker-state-forest",
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

      expect(response_body.length).to eq 2

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
        get :show, params: {id: campground1.id}

        expect(response.status).to eq 200
        expect(response.content_type).to eq 'application/json'
    end

    it "returns information for the specified campground" do
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

  describe "POST#new" do
    let!(:new_campground_hash) { { campground: {
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

    it "creates a new Campground and returns the Campground as json" do
      previous_count = Campground.count
      post :create, params: new_campground_hash, format: :json
      response_body = JSON.parse(response.body)
      new_count = Campground.count

      expect(new_count).to eq(previous_count + 1)
      expect(response_body["campground"].length).to eq 19
      expect(response_body["campground"]["name"]).to eq "Minuteman Campground"
      expect(response_body["campground"]["street"]).to eq "177 Littleton Rd"
      expect(response_body["campground"]["city"]).to eq "Ayer"
      expect(response_body["campground"]["state"]).to eq "MA"
      expect(response_body["campground"]["zip"]).to eq "01432"
      expect(response_body["campground"]["website"]).to eq "https://minutemancampground.com/"
      expect(response_body["campground"]["phone"]).to eq "978-772-0042"
      expect(response_body["campground"]["store"]).to eq true
      expect(response_body["campground"]["firewood"]).to eq false
      expect(response_body["campground"]["bathrooms"]).to eq true
      expect(response_body["campground"]["showers"]).to eq false
      expect(response_body["campground"]["utilities"]).to eq false
      expect(response_body["campground"]["waste"]).to eq true
    end

    context "when a malformed request is made" do
      let!(:bad_campground_hash_1) { { campground: { website: "https://minutemancampground.com/" } } }
      let!(:bad_campground_hash_2) { { campground: { name: "Minuteman Campground" } } }
      let!(:bad_campground_hash_3) { { campground: { name: "Minuteman Campground", website: "minutemancampground.com/" } } }
      let!(:bad_campground_hash_4) { { campground: { name: "", website: "" } } }

      it "does not create a new campground and returns an error if campground name is not provided" do
        previous_count = Campground.count
        post :create, params: bad_campground_hash_1, format: :json
        new_count = Campground.count
        response_body = JSON.parse(response.body)

        expect(new_count).to eq previous_count
        expect(response_body["error"][0]).to eq "Name can't be blank"
      end

      it "does not create a new campground and returns an error if campground street is not provided" do
        previous_count = Campground.count
        post :create, params: bad_campground_hash_2, format: :json
        new_count = Campground.count
        response_body = JSON.parse(response.body)

        expect(new_count).to eq previous_count
        expect(response_body["error"][0]).to eq "Street can't be blank"
      end
    end
  end
end
