// seed.js

const mongoose = require('mongoose');
const faker = require('faker'); // You may need to install the faker package: npm install faker
const { User, Thought } = require('./models'); // Assuming your models are exported like this

// Database URL
const MONGODB_URI = 'mongodb://127.0.0.1:27017/react_practice_api_db';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Helper function to get random elements from an array
const getRandomElements = (array, numElements) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numElements);
};

// Seed data for users and thoughts
const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Create an array of user objects with random usernames and emails
    const users = Array.from({ length: 10 }, () => ({
      username: faker.internet.userName(),
      email: faker.internet.email(),
    }));

    // Create users in the database
    const createdUsers = await User.create(users);

    // Create thoughts for each user
    for (let user of createdUsers) {
      const numThoughts = Math.floor(Math.random() * 5) + 1; // Random number of thoughts (1 to 5)
      for (let i = 0; i < numThoughts; i++) {
        await Thought.create({
          thoughtText: faker.lorem.sentence(),
          username: user.username,
        });
      }
    }

    // Add random friends to each user
    for (let user of createdUsers) {
      const potentialFriends = createdUsers.filter((u) => u._id.toString() !== user._id.toString());
      const numFriends = Math.floor(Math.random() * 3) + 1; // Random number of friends (1 to 3)
      const friendsToAdd = getRandomElements(potentialFriends, numFriends);
      user.friends = friendsToAdd.map((friend) => friend._id);
      await user.save();
    }

    console.log('Seed data successfully added!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Close the connection to the database
    mongoose.connection.close();
  }
};

// Run the seed data function
seedData();
