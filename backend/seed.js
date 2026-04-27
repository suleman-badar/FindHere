import { faker } from '@faker-js/faker';
import connectDB from './config/db.js';
import User from './models/User.js';
import Listing from './models/Listing.js';
import Review from './models/Reviews.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import axios from 'axios';

dotenv.config();

const PAYMENT_METHODS = ["Cash", "Card", "Digital Wallet"];
const SERVICES = ["Dine-in", "Takeaway", "Delivery", "Outdoor Seating", "Reservation"];
const TAGS = ["Family Friendly", "Romantic", "Vegan Options", "Pet Friendly", "Casual"];
const AMENITIES = ["Wifi", "Parking", "Live Music", "Air Conditioning"];
const CUISINES = ["Italian", "Chinese", "Fast Food", "Cafe", "Indian", "Mexican", "Japanese"];

function sample(arr, min = 1, max = 3) {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const out = [];
  for (let i = 0; i < count; i++) {
    out.push(arr[Math.floor(Math.random() * arr.length)]);
  }
  // dedupe
  return Array.from(new Set(out));
}

async function seed() {
  try {
    await connectDB();
    console.log('Connected to DB — seeding sample data');

    // Create a small set of owners (will be used to sign JWTs for API calls)
    const owners = [];
    for (let i = 0; i < 5; i++) {
      const name = `${faker.person.firstName()} ${faker.person.lastName()}`;
      const email = faker.internet.email().toLowerCase();
      const password = 'Password123!';
      const user = new User({ name, email, password, isVerified: true });
      await user.save();
      // sign JWT for this user
      const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '60d' });
      owners.push({ user, token });
    }

    // categories and counts
    const CATEGORIES = ["restaurants","coffee","shopping","entertainment","outdoors","hotels","nightlife","fitness"];
    const LISTINGS_PER_CATEGORY = 5;

    const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.PORT || 7700}`;

    const createdListings = [];

    for (const category of CATEGORIES) {
      // Ensure at least LISTINGS_PER_CATEGORY per category (append-only)
      const existingCount = await Listing.countDocuments({ category });
      const toCreate = Math.max(0, LISTINGS_PER_CATEGORY - existingCount);
      if (toCreate === 0) {
        console.log(`Category ${category} already has ${existingCount} listings, skipping.`);
        continue;
      }

      for (let i = 0; i < toCreate; i++) {
        const ownerObj = owners[Math.floor(Math.random() * owners.length)];
        const owner = ownerObj.user;
        const token = ownerObj.token;

        const name = faker.company.name() + ' ' + (Math.random() > 0.5 ? 'Cafe' : 'Bistro');
        const lat = 24.7 + Math.random() * 0.6;
        const lon = 66.9 + Math.random() * 0.6;

        const body = {
          name,
          tagline: faker.company.catchPhrase(),
          description: faker.lorem.paragraph(),
          location: [lat, lon],
          addressNote: faker.location?.streetAddress?.() || 'Near central landmark',
          phone: faker.phone.number() || '+1-555-0000',
          email: faker.internet.email().toLowerCase(),
          website: faker.internet.url(),
          establishedYear: 2000 + Math.floor(Math.random() * 23),
          hours: JSON.stringify({
            Monday: { open: '10:00', close: '22:00' },
            Tuesday: { open: '10:00', close: '22:00' },
            Wednesday: { open: '10:00', close: '22:00' },
            Thursday: { open: '10:00', close: '22:00' },
            Friday: { open: '10:00', close: '23:00' },
            Saturday: { open: '09:00', close: '23:00' },
            Sunday: { open: '09:00', close: '21:00' },
          }),
          paymentMethods: JSON.stringify(sample(PAYMENT_METHODS, 1, 3)),
          services: JSON.stringify(sample(SERVICES, 1, 4)),
          tags: JSON.stringify(sample(TAGS, 1, 3)),
          amenities: JSON.stringify(sample(AMENITIES, 1, 3)),
          price: Math.floor(Math.random() * 400) + 50,
          cuisine: JSON.stringify(sample(CUISINES, 1, 2)),
          images: JSON.stringify([
            `https://picsum.photos/1200/800?random=${Math.floor(Math.random() * 100000) + i}`,
            `https://picsum.photos/1200/800?random=${Math.floor(Math.random() * 100000) + i + 11}`,
          ]),
          category,
        };

        try {
          const res = await axios.post(`${BASE_URL}/api/listing/`, body, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
            // send cookie header so `protect` middleware can pick it up from cookies
            // axios won't automatically set cookies for cross-origin in node, so set cookie header manually
            headers: { 'Content-Type': 'application/json', 'Cookie': `token=${token}` }
          });

            if (res.data && res.data.data) {
            createdListings.push(res.data.data);
            console.log(`Created listing ${res.data.data._id} in category ${category}`);
            // create 11 reviews for each newly created listing
            for (let r = 0; r < 11; r++) {
              const reviewBody = {
                rating: 1 + Math.floor(Math.random() * 5),
                reviewText: faker.lorem.sentences(2),
                name: `${faker.person.firstName()} ${faker.person.lastName()}`,
              };
              await axios.post(`${BASE_URL}/api/review/create-review/${res.data.data._id}`, reviewBody);
            }
          } else {
            console.warn('Listing API returned unexpected shape', res.data);
          }
        } catch (e) {
          console.error('Error creating listing via API', e.message || e);
        }

        // small delay to avoid overwhelming server
        await new Promise((r) => setTimeout(r, 100));
      }
    }

    console.log(`Seeded ${owners.length} owners, ${createdListings.length} listings.`);
    process.exit(0);
  } catch (err) {
    console.error('Seeding error', err);
    process.exit(1);
  }
}

seed();
