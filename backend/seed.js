import { faker } from '@faker-js/faker';
import connectDB from './config/db.js';
import User from './models/User.js';
import Listing from './models/Listing.js';
import Review from './models/Reviews.js';
import dotenv from 'dotenv';

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

    // Remove previous sample listings/reviews created by this script
    await Listing.deleteMany({});
    await Review.deleteMany({});

    // Create a small set of owners
    const owners = [];
    for (let i = 0; i < 5; i++) {
      const name = `${faker.person.firstName()} ${faker.person.lastName()}`;
      const email = faker.internet.email().toLowerCase();
      const password = 'Password123!';
      const user = new User({ name, email, password });
      await user.save();
      owners.push(user);
    }

    const listings = [];
    // Create 12 listings
    for (let i = 0; i < 12; i++) {
      const owner = owners[Math.floor(Math.random() * owners.length)];
      const name = faker.company.name() + ' ' + (Math.random() > 0.5 ? 'Cafe' : 'Bistro');
      const lat = 24.7 + Math.random() * 0.6; // region example
      const lon = 66.9 + Math.random() * 0.6;

      const newListing = new Listing({
        name,
        tagline: faker.company.catchPhrase(),
        description: faker.lorem.paragraph(),
        location: [lat, lon],
        addressNote: faker.location?.streetAddress?.() || faker.address?.streetAddress?.() || 'Near central landmark',
        phone: faker.phone.number() || '+1-555-0000',
        email: faker.internet.email().toLowerCase(),
        website: faker.internet.url(),
        establishedYear: 2000 + Math.floor(Math.random() * 23),
        hours: {
          Monday: { open: '10:00', close: '22:00' },
          Tuesday: { open: '10:00', close: '22:00' },
          Wednesday: { open: '10:00', close: '22:00' },
          Thursday: { open: '10:00', close: '22:00' },
          Friday: { open: '10:00', close: '23:00' },
          Saturday: { open: '09:00', close: '23:00' },
          Sunday: { open: '09:00', close: '21:00' },
        },
        paymentMethods: sample(PAYMENT_METHODS, 1, 3),
        services: sample(SERVICES, 1, 4),
        tags: sample(TAGS, 1, 3),
        amenities: sample(AMENITIES, 1, 3),
        price: Math.floor(Math.random() * 400) + 50,
        cuisine: sample(CUISINES, 1, 2),
        images: [
          `https://picsum.photos/1200/800?random=${Math.floor(Math.random() * 1000) + i}`,
          `https://picsum.photos/1200/800?random=${Math.floor(Math.random() * 1000) + i + 11}`,
        ],
        owner: owner._id,
      });

      await newListing.save();
      listings.push(newListing);
    }

    // Create reviews for listings
    const reviews = [];
    for (const listing of listings) {
      const count = 1 + Math.floor(Math.random() * 5);
      for (let r = 0; r < count; r++) {
        const review = new Review({
          rating: 3 + Math.floor(Math.random() * 3),
          reviewText: faker.lorem.sentences(2),
          name: `${faker.person.firstName()} ${faker.person.lastName()}`,
          image: `https://i.pravatar.cc/80?img=${Math.floor(Math.random() * 70) + 1}`,
          listingId: listing._id,
        });
        await review.save();
        reviews.push(review);
      }
    }

    console.log(`Seeded ${owners.length} owners, ${listings.length} listings, ${reviews.length} reviews.`);
    process.exit(0);
  } catch (err) {
    console.error('Seeding error', err);
    process.exit(1);
  }
}

seed();
