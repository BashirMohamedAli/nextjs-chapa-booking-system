import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  email: String,
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' },
  chapaTxRef: String
});

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
