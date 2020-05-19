# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

User.create(
  email: "user@domain.com",
  user_name: "user1",
  password: "userpassword"
)

User.create(
  email: "admin@domain.com",
  user_name: "admin1",
  password: "adminpassword",
  admin: true
)

Campground.create(
  name: "Minuteman Campground",
  street: "177 Littleton Rd",
  city: "Ayer",
  state: "MA",
  zip: "01432",
  website: "https://minutemancampground.com/",
  phone: "978-772-0042",
  image: "https://minutemancampground.com/wp-content/uploads/2013/08/Two-Cabins-FW.jpg",
  latitude: 42.5500,
  longitude: -71.5368,
  store: true,
  firewood: true,
  bathrooms: false,
  showers: false,
  utilities: false,
  waste: false
)

Campground.create(
  name: "Arches National Park",
  street: "PO Box 907",
  city: "Moab",
  state: "UT",
  zip: "84532",
  website: "https://www.nps.gov/arch/index.htm",
  phone: "435-719-2299",
  image:
   "https://www.nps.gov/npgallery/GetAsset/4225fa00-26cb-4dd4-9522-73c5efe8a67c/proxy/hires?",
  latitude: 38.733082,
  longitude: -109.592514,
  store: true,
  firewood: false,
  bathrooms: true,
  showers: false,
  utilities: false,
  waste: true
)

Campground.create(
  name: "Zion National Park",
  street: "1 Zion Park Blvd., State Route 9",
  city: "Springdale",
  state: "UT",
  zip: "84767",
  website: "https://www.nps.gov/zion/index.htm",
  phone: "435-772-3256",
  image:
   "https://www.nps.gov/npgallery/GetAsset/984B1AD7-155D-451F-678407719ECEB6B9/proxy/hires?",
 latitude: 37.317207,
 longitude: -113.022537,
 store: true,
 firewood: false,
 bathrooms: true,
 showers: false,
 utilities: false,
 waste: true
)
