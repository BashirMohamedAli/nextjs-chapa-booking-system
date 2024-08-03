const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  available: Boolean,
});

module.exports = mongoose.models.Room || mongoose.model('Room', RoomSchema);
