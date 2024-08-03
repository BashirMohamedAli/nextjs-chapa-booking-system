const Room = require('../models/Room'); // Corrected import path to match the original casing of the file
const mongoose = require('mongoose');
const rooms = require('../data/room.json');

mongoose
  .connect('mongodb://localhost:27017/nextjs-chapa-booking-system', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to database');
    seedRooms(); // Start seeding after connection is established
  })
  .catch((error) => {
    console.error('Database connection error:', error.message);
    process.exit(1);
  });

const seedRooms = async () => {
  try {
    await Room.deleteMany();
    console.log('Rooms are deleted');

    await Room.insertMany(rooms);
    console.log('All rooms are added');
  } catch (error) {
    console.error('Error seeding database:', error.message);
  } finally {
    mongoose.connection.close(() => {
      console.log('Database connection closed');
      process.exit();
    });
  }
};
