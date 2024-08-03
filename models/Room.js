import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  available: { type: Boolean, default: true }
});

export default mongoose.models.Room || mongoose.model('Room', RoomSchema);
